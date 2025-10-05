import { siteConfig } from '../config'

const CACHE_KEY = 'umami-stats-cache'
const CACHE_TTL = 3600000 // 1小时

export const useUmamiStats = async () => {
  const umamiConfig = siteConfig.umami
  
  // 如果Umami未启用，直接返回0
  if (!umamiConfig.enable) {
    return { visitors: 0 }
  }
  
  // 检查缓存
  if (typeof localStorage !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return parsed.value
        }
      } catch {
        localStorage.removeItem(CACHE_KEY)
      }
    }
  }
  
  try {
    // 首先请求分享API获取websiteId和token
    const authUrl = `https://${umamiConfig.region}.umami.is/api/share/${umamiConfig.shareId}`
    const authResponse = await fetch(authUrl)
    
    if (!authResponse.ok) {
      throw new Error(`认证请求失败: ${authResponse.status}`)
    }
    
    const authData = await authResponse.json()
    const token = authData.token
    const websiteId = authData.websiteId
    
    // 使用token作为请求头，请求网站总体统计数据
    // startAt=0 表示从1970年开始统计
    // endAt=当前时间 表示统计到当前时间
    const endAt = Date.now()
    const statsUrl = `https://${umamiConfig.region}.umami.is/api/websites/${websiteId}/stats?startAt=0&endAt=${endAt}&unit=day&timezone=Asia/Shanghai&compare=false`
    
    const statsResponse = await fetch(statsUrl, {
      headers: {
        'x-umami-share-token': token
      }
    })
    
    if (!statsResponse.ok) {
      throw new Error(`统计数据请求失败: ${statsResponse.status}`)
    }
    
    const statsData = await statsResponse.json()
    
    // 获取总的访客量
    const result = {
      visitors: statsData?.visitors?.value || 0
    }
    
    // 保存到缓存
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ 
        timestamp: Date.now(), 
        value: result 
      }))
    }
    
    return result
  } catch (error) {
    console.error('获取Umami数据失败:', error)
    // 出错时返回0而不是抛出错误
    return { visitors: 0 }
  }
}