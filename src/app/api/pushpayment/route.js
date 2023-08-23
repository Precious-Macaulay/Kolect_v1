import axios from "axios"

export default async function POST(request) {
  const url = `/terminal//event`
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer sk_test_4fb07c0380a266230aedc1ff577781b198dd24a7`
  }

  const {id, offline_reference} = JSON.parse(req.body)

  const data = { 
    type: "invoice",
    action: "process",
    data: {
      id: id,
      reference: offline_reference
    }
  }

  try {
    const response = await axios.post(url, data, { headers })
    res.status(200).send(response.data)
  } catch (error) {
    res.status(500).send(error)
  }
}