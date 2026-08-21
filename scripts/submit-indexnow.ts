import { POSITIONS_DATA } from '../lib/positionsData'
import { SOLUTIONS_DATA } from '../lib/solutionsData'
import { POSITION_ALIASES } from '../lib/positionAliases'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const HOST = 'desirespec-ai.onrender.com'
const KEY = 'desirespec-ai-indexnow-key'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

async function submitToIndexNow() {
  console.log('⚡ Submitting DesireSpec AI High-Volume URL Catalog to IndexNow Search Engines...')

  const urlList = [
    `https://${HOST}/`,
    `https://${HOST}/guides/the-anti-porn-intimacy-reset`,
    `https://${HOST}/guides/compounding-intimacy-for-long-term-couples`,
    `https://${HOST}/guides/pelvic-tilt-biomechanics`,
    ...SOLUTIONS_DATA.map((s) => `https://${HOST}/solutions/${s.slug}`),
    ...POSITIONS_DATA.map((p) => `https://${HOST}/positions/${p.id}`),
    ...Object.keys(POSITION_ALIASES).map((alias) => `https://${HOST}/positions/${alias}`),
  ]

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList,
  }

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    console.log(`✅ IndexNow Response Status: ${response.status} (${response.statusText})`)
    console.log(`🎯 Successfully submitted ${urlList.length} high-intent URLs for instant search indexing.`)
  } catch (err) {
    console.error('❌ Error submitting to IndexNow:', err)
  }
}

submitToIndexNow()
