import { siteConfig } from '../config'

const CACHE_KEY = 'umami-stats-cache'
const CACHE_TTL = 3600000 // 1小时

export const useUmamiStats = async () => {
  const umamiConfig = siteConfig.umami
  
  // 如果Umami未启用，直接返回0
  if (!umamiConfig.enable) {
    return { visitors: 0 }
  }

  // 检查是否配置了API密钥和网站ID
  if (!umamiConfig.apiKey || !umamiConfig.websiteId) {
    console.warn('Umami API密钥或网站ID未配置')
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
    // 使用 Umami Cloud V3 API
    // 获取网站统计数据
    const endAt = Date.now()
    const startAt = new Date('2020-01-01').getTime() // 从2020年开始统计（或设置为您网站创建的时间）
    
    // Umami Cloud V3 正确的 API 端点
    const statsUrl = `${umamiConfig.apiEndpoint}/v1/websites/${umamiConfig.websiteId}/stats?startAt=${startAt}&endAt=${endAt}`
    
    const statsResponse = await fetch(statsUrl, {
      headers: {
        'x-umami-api-key': umamiConfig.apiKey
      }
    })
    
    if (!statsResponse.ok) {
      const errorText = await statsResponse.text()
      console.error('API 响应错误:', errorText)
      throw new Error(`统计数据请求失败: ${statsResponse.status} ${statsResponse.statusText}`)
    }
    
    const statsData = await statsResponse.json()
    
    // 获取总的访客量
    // Umami V3 API 直接返回数字，不是对象
    const result = {
      visitors: statsData?.visitors || 0
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