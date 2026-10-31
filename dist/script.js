const siteHeader=document.querySelector('.site-header');
const updateHeaderState=()=>siteHeader?.classList.toggle('is-scrolled',window.scrollY>32);
window.addEventListener('scroll',updateHeaderState,{passive:true});
updateHeaderState();const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.classList.toggle('open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open navigation')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.main-nav a')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section=>sectionObserver.observe(section));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('.filter-button').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('.filter-button').forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active))});document.querySelectorAll('.impact-card').forEach(card=>{const categories=card.dataset.category.split(/\s+/);card.hidden=filter!=='all'&&!categories.includes(filter)})}));

// Atom-like orbits, a database core, and a neural mesh with reduced-motion support.
(()=>{
  const canvas=document.querySelector('#neural-network');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true});
  const host=canvas.parentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seed=137;
  const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
  const points=Array.from({length:38},()=>[.045+random()*.91,.07+random()*.86]);
  const nodes=points.map(([x,y],i)=>({x,y,phase:random()*Math.PI*2,z:.48+random()*.52}));
  const edgeSet=new Set();
  nodes.forEach((a,i)=>nodes.map((b,j)=>({j,d:Math.hypot(a.x-b.x,a.y-b.y)})).filter(n=>n.j!==i).sort((a,b)=>a.d-b.d).slice(0,3).forEach(n=>{if(n.d<.34)edgeSet.add(`${Math.min(i,n.j)}:${Math.max(i,n.j)}`)}));
  const edges=[...edgeSet].map(key=>{const [i,j]=key.split(':').map(Number);return[i,j,random()*Math.PI*2]});  let width=0,height=0,dpr=1,px=0,py=0,targetX=0,targetY=0,visible=true,last=0,raf=0,elapsed=0;
  const resize=()=>{const box=host.getBoundingClientRect();width=box.width;height=box.height;dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0);draw(elapsed)};
  const draw=t=>{
    if(!width||!height)return;
    ctx.clearRect(0,0,width,height);
    const time=t/1000,cx=width*.5,cy=height*.51,unit=Math.min(width,height);
    if(!reduced){px+=(targetX-px)*.035;py+=(targetY-py)*.035;}
    const coords=nodes.map(n=>({x:n.x*width+Math.sin(time*.38+n.phase)*11+px*7*n.z,y:n.y*height+Math.cos(time*.31+n.phase)*6+py*5*n.z,r:1.5+n.z*1.8}));

    // Soft volume behind the mesh.
    const haze=ctx.createRadialGradient(cx,cy,8,cx,cy,unit*.49);
    haze.addColorStop(0,'rgba(42,154,166,.12)');haze.addColorStop(.48,'rgba(30,108,152,.06)');haze.addColorStop(1,'rgba(7,10,16,0)');
    ctx.fillStyle=haze;ctx.fillRect(0,0,width,height);

    // Soft, curved connections make the mesh feel organic rather than gridded.
    edges.forEach(([i,j,bendPhase],k)=>{
      const a=coords[i],b=coords[j],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
      const bend=Math.sin(time*.34+bendPhase)*Math.min(28,len*.26),qx=(a.x+b.x)*.5-dy/len*bend,qy=(a.y+b.y)*.5+dx/len*bend;
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(qx,qy,b.x,b.y);
      ctx.strokeStyle=`rgba(91,205,199,${.055+nodes[i].z*.075})`;ctx.lineWidth=.58;ctx.stroke();
      const phase=(time*.12+k*.067)%1,q=phase<.5?phase*2:(1-phase)*2,u=1-q;
      const x=u*u*a.x+2*u*q*qx+q*q*b.x,y=u*u*a.y+2*u*q*qy+q*q*b.y;
      ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fillStyle='rgba(169,255,237,.76)';ctx.shadowColor='#56dacc';ctx.shadowBlur=6;ctx.fill();ctx.shadowBlur=0;
    });    coords.forEach((p,i)=>{
      const activation=.5+.5*Math.sin(time*(.55+(i%4)*.09)+nodes[i].phase);
      ctx.beginPath();ctx.arc(p.x,p.y,p.r+activation*1.1,0,Math.PI*2);
      ctx.fillStyle=`rgba(111,231,216,${.36+activation*.5})`;ctx.shadowColor=i%3===0?'#8cdaff':'#59d5cb';ctx.shadowBlur=4+activation*9;ctx.fill();ctx.shadowBlur=0;
    });

    // Three slow, differently inclined atom orbits and their moving particles.
    const orbits=[{angle:time*.065,rx:unit*.42,ry:unit*.18,color:'rgba(91,221,207,.47)',phase:.4},{angle:time*.065+.785,rx:unit*.43,ry:unit*.155,color:'rgba(95,178,232,.39)',phase:2.3},{angle:time*.065+1.571,rx:unit*.42,ry:unit*.14,color:'rgba(151,232,221,.34)',phase:4.5},{angle:time*.065+2.356,rx:unit*.46,ry:unit*.12,color:'rgba(93,167,219,.3)',phase:5.2}];
    orbits.forEach((o,i)=>{
      ctx.save();ctx.translate(cx,cy);ctx.rotate(o.angle);ctx.beginPath();ctx.ellipse(0,0,o.rx,o.ry,0,0,Math.PI*2);ctx.strokeStyle=o.color;ctx.lineWidth=1.05;ctx.stroke();
      const a=time*(i===1?-.34:.28)+o.phase,x=Math.cos(a)*o.rx,y=Math.sin(a)*o.ry;
      const grad=ctx.createRadialGradient(x,y,0,x,y,15);grad.addColorStop(0,i===1?'rgba(160,225,255,.95)':'rgba(159,255,233,.98)');grad.addColorStop(1,'rgba(91,213,202,0)');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(x,y,15,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x,y,3.1,0,Math.PI*2);ctx.fillStyle='#c5fff2';ctx.shadowColor='#61d9ce';ctx.shadowBlur=12;ctx.fill();ctx.shadowBlur=0;ctx.restore();
    });

    // A compact, symmetric three-tier database cylinder.
    const rw=Math.min(width*.115,76),rh=Math.min(height*.105,54),shell=rh*.58,top=cy-shell,bottom=cy+shell;
    const body=ctx.createLinearGradient(cx-rw,cy,cx+rw,cy);body.addColorStop(0,'rgba(10,24,35,.97)');body.addColorStop(.5,'rgba(17,42,54,.98)');body.addColorStop(1,'rgba(8,20,30,.97)');
    ctx.beginPath();ctx.moveTo(cx-rw,top);ctx.lineTo(cx-rw,bottom);ctx.ellipse(cx,bottom,rw,rh*.32,0,Math.PI,0,true);ctx.lineTo(cx+rw,top);ctx.closePath();ctx.fillStyle=body;ctx.fill();
    ctx.beginPath();ctx.moveTo(cx-rw,top);ctx.lineTo(cx-rw,bottom);ctx.moveTo(cx+rw,top);ctx.lineTo(cx+rw,bottom);ctx.strokeStyle='rgba(113,229,218,.8)';ctx.lineWidth=1.1;ctx.stroke();
    const ringRy=rh*.32*(1+.012*Math.sin(time*.72));
    [top,cy,bottom].forEach((y,i)=>{ctx.beginPath();ctx.ellipse(cx,y,rw,ringRy,0,0,Math.PI*2);ctx.strokeStyle=i===1?'rgba(153,238,226,.9)':'rgba(98,209,205,.72)';ctx.lineWidth=i===1?1.1:1;ctx.stroke()});
    ctx.fillStyle='rgba(194,242,239,.88)';ctx.font='9px DM Mono, monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('DATA',cx,cy+1);  };
  const loop=now=>{raf=0;if(!visible||document.hidden)return;if(now-last<32){raf=requestAnimationFrame(loop);return}last=now;elapsed=now;draw(now);if(!reduced)raf=requestAnimationFrame(loop)};
  const start=()=>{if(!raf&&visible&&!document.hidden)raf=requestAnimationFrame(loop)};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else if(raf){cancelAnimationFrame(raf);raf=0}},{threshold:0});observer.observe(host);
  host.addEventListener('pointermove',e=>{if(reduced||e.pointerType!=='mouse')return;const r=host.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width-.5;targetY=(e.clientY-r.top)/r.height-.5});
  host.addEventListener('pointerleave',()=>{targetX=0;targetY=0});window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>document.hidden? (raf&&cancelAnimationFrame(raf),raf=0):start());
  resize();if(reduced)draw(0);else start();
})();
(()=>{
  const canvas=document.querySelector('#hero-particles');
  const host=document.querySelector('#home');
  if(!canvas||!host)return;
  const ctx=canvas.getContext('2d',{alpha:true});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width=0,height=0,dpr=1,particles=[],visible=false,last=0,raf=0;
  const resetParticle=p=>{
    p.x=Math.random()*width;p.y=Math.random()*height;
    p.vx=(Math.random()-.5)*9;p.vy=(Math.random()-.5)*7;
    p.life=5+Math.random()*7;p.age=Math.random()*p.life;
    p.radius=.8+Math.random()*.9;p.color=Math.random()<.68?'111,231,216':'140,205,239';
  };
  const resize=()=>{
    const box=host.getBoundingClientRect();width=box.width;height=box.height;
    dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=Math.min(28,Math.max(10,Math.round(width*height/42000)));
    particles=Array.from({length:count},()=>{const p={};resetParticle(p);return p});
    draw(0);
  };
  const draw=t=>{
    if(!width||!height)return;
    ctx.clearRect(0,0,width,height);
    const dt=last?Math.min(.06,Math.max(0,(t-last)/1000)):0;last=t;
    particles.forEach(p=>{
      if(!reduced){p.x+=p.vx*dt;p.y+=p.vy*dt;p.age+=dt;}
      if(p.age>=p.life||p.x< -8||p.x>width+8||p.y< -8||p.y>height+8){resetParticle(p);}
      const fade=Math.min(1,p.age/.9,(p.life-p.age)/1.8)*.29;
      if(fade<=0)return;
      ctx.beginPath();ctx.moveTo(p.x-p.vx*.45,p.y-p.vy*.45);ctx.lineTo(p.x,p.y);
      ctx.strokeStyle=`rgba(${p.color},${fade*.48})`;ctx.lineWidth=.65;ctx.stroke();
      ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.color},${fade})`;ctx.shadowColor=`rgba(${p.color},${fade})`;ctx.shadowBlur=5;ctx.fill();ctx.shadowBlur=0;
    });
  };
  const loop=now=>{raf=0;if(!visible||document.hidden)return;if(now-last<34){raf=requestAnimationFrame(loop);return}draw(now);if(!reduced)raf=requestAnimationFrame(loop)};
  const start=()=>{if(!raf&&visible&&!document.hidden&&!reduced)raf=requestAnimationFrame(loop)};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else if(raf){cancelAnimationFrame(raf);raf=0}},{threshold:0});observer.observe(host);
  window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?(raf&&cancelAnimationFrame(raf),raf=0):start());
  resize();
})();
