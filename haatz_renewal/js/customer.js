/* 고객지원 서비스 카드의 제목·설명·검색어를 기준으로 페이지 안에서 검색 */
(() => {
  const form=document.getElementById("support-search");
  const input=document.getElementById("support-query");
  const grid=document.getElementById("support-grid");
  const count=document.getElementById("result-count");
  const empty=document.getElementById("no-result");
  if(!form||!input||!grid||!count||!empty)return;
  const cards=[...grid.querySelectorAll(":scope > li")];
  function search(){
    const q=input.value.trim().toLocaleLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const text=(card.textContent+" "+(card.dataset.search||"")).toLocaleLowerCase();
      const matched=!q||text.includes(q);
      card.hidden=!matched;
      if(matched)visible++;
    });
    count.innerHTML="검색 결과 <strong>"+visible+"</strong>개 서비스";
    empty.hidden=visible!==0;
  }
  form.addEventListener("submit",event=>{event.preventDefault();search();});
  input.addEventListener("input",search);
})();
