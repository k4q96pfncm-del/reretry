export default async function handler(request, response) {
  const NOTION_KEY = process.env.NOTION_KEY;
  const NOTION_DB_ID = process.env.NOTION_DB_ID;

  try {
    const notionResponse = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page_size: 100 })
      }
    );

    const data = await notionResponse.json();
    response.status(200).json(data);

  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Failed to fetch data' });
  }
}