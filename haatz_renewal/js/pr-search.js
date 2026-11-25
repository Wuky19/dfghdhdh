/* 홍보센터 4개 메뉴 카드 검색 */
(() => {
  const form=document.getElementById("pr-search");
  const input=document.getElementById("pr-query");
  const grid=document.getElementById("pr-menu-grid");
  const count=document.getElementById("pr-search-count");
  if(!form||!input||!grid||!count)return;
  const cards=[...grid.querySelectorAll(".pr-menu-card")];
  function search(){
    const q=input.value.trim().toLocaleLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const matched=!q||card.textContent.toLocaleLowerCase().includes(q);
      card.hidden=!matched;
      if(matched)visible++;
    });
    count.textContent=q?"검색 결과 "+visible+"개 콘텐츠":"전체 "+visible+"개 콘텐츠";
  }
  form.addEventListener("submit",event=>{event.preventDefault();search();});
  input.addEventListener("input",search);
})();
