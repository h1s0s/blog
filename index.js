import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";


var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
var hours = ('0' + today.getHours()).slice(-2);
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2);

var dateString = year + '-' + month  + '-' + day;
var timeString = hours + ':' + minutes  + ':' + seconds;
/**
 * README.MD
 */

let text = `
## 능이 개발자의 블로그
<a href=https://codinghan.tistory.com/><img src=\"https://tistory1.daumcdn.net/tistory/5180850/attach/5c7ec571e4a94f2d926efb474d114c39\" width=\"320\"></a>


## 📕 Latest Blog Posts

`;

text += '<p>'+dateString+' '+timeString+'</p>';

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://codinghan.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < feed.items.length; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href=${link}>${title}</a></br>`;
    }

    // README.md 파일 작성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    })

    console.log('업데이트 완료')
})();