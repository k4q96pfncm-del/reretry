// app.js (새로 만든 파일)

// ▼▼▼ 본인 키와 ID를 채워주세요 (따옴표 필수!) ▼▼▼
const NOTION_KEY ='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'; 
const NOTION_DATABASE_ID ='2d77ec71623f8051a1b9d797107e92f9'; 
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

const express = require('express');

// ★★★ 여기가 핵심! 중괄호 { } 필수 ★★★
const { Client } = require('@notionhq/client'); 

const app = express();
const notion = new Client({ auth: NOTION_KEY });

// 현재 폴더에 있는 index.html 연결
app.use(express.static('./')); 
app.use(express.json());

// 1. 목록 가져오기
app.get('/api/notion', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("에러:", error);
        res.status(500).json({ error: error.message });
    }
});

// 2. 구매하기
app.post('/api/purchase', async (req, res) => {
    try {
        const { pageIds, properties } = req.body;
        for (const pageId of pageIds) {
            await notion.pages.update({
                page_id: pageId,
                properties: properties,
            });
        }
        res.status(200).json({ message: "성공" });
    } catch (error) {
        console.error("에러:", error);
        res.status(500).json({ error: error.message });
    }
});

// 서버 실행
app.listen(3000, () => {
    console.log('★새로운 서버(app.js)가 실행되었습니다!★');
    console.log('http://localhost:3000 으로 접속하세요.');
});