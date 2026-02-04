const r="poko-overlay",g=()=>{if(document.getElementById("poko-overlay-style"))return;const t=document.createElement("style");t.id="poko-overlay-style",t.textContent=`
    #${r} {
      position: fixed;
      inset: 0;
      background: rgba(12, 14, 20, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2147483647;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }
    #${r} .poko-card {
      background: #fff;
      color: #12131a;
      border-radius: 16px;
      padding: 24px 28px;
      width: min(420px, 92vw);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
      text-align: center;
    }
    #${r} .poko-actions {
      margin-top: 16px;
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    #${r} button {
      border: none;
      border-radius: 999px;
      padding: 10px 18px;
      cursor: pointer;
      font-weight: 600;
    }
    #${r} .poko-continue {
      background: #1f5cff;
      color: #fff;
    }
    #${r} .poko-cancel {
      background: #eceef3;
      color: #1a1c26;
    }
  `,document.head.appendChild(t)},v=(t,e,s,c={})=>{p(),g();const o=document.createElement("div");o.id=r;const i=c.disableForSeconds??0;o.innerHTML=`
    <div class="poko-card">
      <h2>Pause for a second</h2>
      <p>${t}</p>
      ${i>0?`<p class="poko-countdown">Wait ${i}s</p>`:""}
      <div class="poko-actions">
        <button class="poko-cancel" type="button">Not yet</button>
        <button class="poko-continue" type="button">Continue</button>
      </div>
    </div>
  `,o.addEventListener("click",l=>{l.target===o&&s()});const n=o.querySelector(".poko-cancel"),d=o.querySelector(".poko-continue"),h=o.querySelector(".poko-countdown");if(d&&i>0){d.disabled=!0;let l=i;const b=()=>{if(l-=1,h&&(h.textContent=`Wait ${Math.max(l,0)}s`),l<=0&&d){d.disabled=!1,h&&(h.textContent="You can continue now.");return}window.setTimeout(b,1e3)};window.setTimeout(b,1e3)}n==null||n.addEventListener("click",s),d==null||d.addEventListener("click",e),document.body.appendChild(o)},p=()=>{const t=document.getElementById(r);t==null||t.remove()};class w{constructor(e){this.minPauseSeconds=0,this.enabled=!0,this.paused=!1,this.handleClick=s=>{if(!this.enabled||this.paused)return;const c=s.target;if(!c)return;const o=this.selectors.find(n=>c.closest(n));if(!o)return;s.preventDefault(),s.stopPropagation();const i=c.closest(o)??c;this.paused=!0,v("This looks like checkout. Want to continue?",()=>{var n;p(),this.paused=!1,(n=this.onContinue)==null||n.call(this,i),i.click()},()=>{var n;p(),this.paused=!1,(n=this.onCancel)==null||n.call(this)},{disableForSeconds:this.minPauseSeconds})},this.selectors=e.selectors,this.minPauseSeconds=e.minPauseSeconds??0,this.onContinue=e.onContinue,this.onCancel=e.onCancel}updateSelectors(e){this.selectors=e}updateMinPauseSeconds(e){this.minPauseSeconds=e}setEnabled(e){this.enabled=e,e||p()}attach(){document.addEventListener("click",this.handleClick,!0)}detach(){document.removeEventListener("click",this.handleClick,!0)}}const x=["button[type='submit']","button[name*='checkout']","button[id*='checkout']","button[class*='checkout']","a[href*='checkout']","[data-checkout]"],E=[".countdown",".limited",".timer",".scarcity",".low-stock","[class*='countdown']","[class*='timer']","[class*='scarcity']","[class*='stock']","[id*='countdown']","[id*='timer']","[id*='scarcity']","[id*='stock']","[data-countdown]","[data-pressure]","[data-scarcity]","[data-urgency]"],P=t=>{const e=[];return t.forEach(s=>{e.push(...Array.from(document.querySelectorAll(s)))}),e};class C{constructor(e){this.observer=null,this.handler=e}start(){this.observer||(this.observer=new MutationObserver(()=>{this.handler()}),this.observer.observe(document.body,{childList:!0,subtree:!0}))}stop(){var e;(e=this.observer)==null||e.disconnect(),this.observer=null}}const H=/([$€£]\s?\d+(?:[.,]\d{2})?)/,T=()=>{var s;const e=(((s=document.body)==null?void 0:s.innerText)??"").match(H);return e?e[1]:null},a={enabled:!0,checkoutSelectors:x,pressureSelectors:E,minPauseSeconds:0,enabledHosts:[],disabledHosts:[],upgradeUrl:"https://poko.app/pricing"},u="settings";let f=a.pressureSelectors,k=!0;const $=t=>{const e=window.location.hostname;return t.disabledHosts.includes(e)?!1:t.enabledHosts.length>0?t.enabledHosts.includes(e):!0},y=()=>{if(!k)return;P(f).forEach(e=>{e.setAttribute("data-poko-pressure","true"),e.style.setProperty("display","none","important")})},m=new w({selectors:a.checkoutSelectors,minPauseSeconds:a.minPauseSeconds,onContinue:()=>{chrome.runtime.sendMessage({type:"record-event",payload:{url:window.location.href,timestamp:new Date().toISOString(),price:T()}})}}),L=new C(()=>{y()}),S=t=>{var c,o;const e={...a,...t,checkoutSelectors:(c=t.checkoutSelectors)!=null&&c.length?t.checkoutSelectors:a.checkoutSelectors,pressureSelectors:(o=t.pressureSelectors)!=null&&o.length?t.pressureSelectors:a.pressureSelectors,enabledHosts:t.enabledHosts??[],disabledHosts:t.disabledHosts??[]};m.updateSelectors(e.checkoutSelectors),m.updateMinPauseSeconds(e.minPauseSeconds),f=e.pressureSelectors;const s=e.enabled&&$(e);k=s,m.setEnabled(s),y()};chrome.storage.sync.get({[u]:a},t=>{S(t[u])});chrome.storage.onChanged.addListener((t,e)=>{e==="sync"&&t[u]&&chrome.storage.sync.get({[u]:a},s=>{S(s[u])})});m.attach();L.start();
