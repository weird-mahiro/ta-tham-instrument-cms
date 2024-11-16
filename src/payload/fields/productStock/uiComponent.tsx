import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { FieldServerComponent } from 'payload'
import config from '@payload-config'

const LIMIT = 9999

export const StockComponent: FieldServerComponent = async (props) => {
  const { data } = props
  const payload = await getPayloadHMR({ config })
  const result = await payload.find({
    collection: 'inventory-logs',
    where: {
      product: {
        equals: data.id,
      },
    },
    limit: LIMIT,
  })
  let displayValue = 0
  for (let i = 0; i < result.docs.length; i++) {
    if (result.docs[i].type === 'import') {
      displayValue += result.docs[i].quantity
    } else {
      displayValue -= result.docs[i].quantity
    }
  }
  return <h3 style={{ paddingBottom: '10px' }}>Stock left: {displayValue}</h3>
}
