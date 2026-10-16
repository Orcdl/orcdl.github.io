(function(){
  var PLANS={
    andam:{name:'Sổ tay ăn dặm 3 bữa',amount:79000,code:'AN DAM'},
    combo:{name:'Combo 2 cuốn',amount:99000,code:'COMBO'},
    nntc:{name:'Ngôn ngữ tích cực với con',amount:49000,code:'NNTC'}
  };
  var BANK_BIN='970415', ACCOUNT='100887872745';
  var plan=document.body.dataset.plan||'andam';
  var $=function(id){return document.getElementById(id)};
  var toast=$('toast'),tt;
  function show(m){toast.textContent=m;toast.hidden=false;clearTimeout(tt);tt=setTimeout(function(){toast.hidden=true},1800)}
  function track(name){try{if(window.fbq)fbq('trackCustom',name);if(window.gtag)gtag('event',name)}catch(e){}}

  // VietQR (chuẩn EMVCo/NAPAS), CRC16-CCITT
  function tlv(id,v){return id+String(v.length).padStart(2,'0')+v}
  function crc16(s){var c=0xFFFF;for(var i=0;i<s.length;i++){c^=s.charCodeAt(i)<<8;for(var j=0;j<8;j++)c=(c&0x8000)?((c<<1)^0x1021)&0xFFFF:(c<<1)&0xFFFF}return c.toString(16).toUpperCase().padStart(4,'0')}
  function vietqr(amount,content){
    var p=tlv('00','01')+tlv('01','12')+tlv('38',tlv('00','A000000727')+tlv('01',tlv('00',BANK_BIN)+tlv('01',ACCOUNT))+tlv('02','QRIBFTTA'))
      +tlv('53','704')+tlv('54',String(amount))+tlv('58','VN')+tlv('62',tlv('08',content))+'6304';
    return p+crc16(p);
  }
  function phone(){return ($('sdt').value||'').replace(/\D/g,'').slice(0,11)}
  function content(){var p=phone();return PLANS[plan].code+(p?' '+p:'')}
  function money(n){return n.toLocaleString('vi-VN').replace(/,/g,'.')+'đ'}

  function render(){
    var P=PLANS[plan],nd=content();
    $('sum-name').textContent=P.name; $('sum-amt').textContent=money(P.amount);
    $('sum-nd').textContent=nd; $('nd').textContent=nd;
    document.querySelectorAll('.picked button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.plan===plan)});
    if(typeof qrcode!=='function')return; // giữ mã QR tĩnh nếu thư viện chưa tải
    var q=qrcode(0,'M');q.addData(vietqr(P.amount,nd));q.make();
    var url=q.createDataURL(8,4);
    $('qr').innerHTML='<img alt="Mã VietQR '+money(P.amount)+', nội dung '+nd+'" src="'+url+'">';
    var a=$('save-qr');a.href=url;a.download='QR-LITI-'+P.code.replace(' ','')+'.gif';
  }
  function choose(p,jump){plan=p;render();track('choose_'+p);if(jump)$('dat-mua').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}

  document.querySelectorAll('.plan [data-plan]').forEach(function(b){b.addEventListener('click',function(){choose(b.dataset.plan,true)})});
  document.querySelectorAll('.picked [data-plan]').forEach(function(b){b.addEventListener('click',function(){choose(b.dataset.plan,false)})});
  $('sdt').addEventListener('input',render);

  function copy(v){
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(function(){show('Đã chép: '+v)},function(){show('Bấm giữ để sao chép')})}
    else show('Bấm giữ để sao chép');
  }
  document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){copy(b.dataset.copy)})});
  $('copy-nd').addEventListener('click',function(){copy(content())});
  document.querySelectorAll('[data-ev]').forEach(function(a){a.addEventListener('click',function(){track(a.dataset.ev)})});

  // Ẩn thanh dính khi đang ở bảng giá hoặc thanh toán
  var sticky=$('sticky');
  if('IntersectionObserver' in window){
    var seen=new Set();
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?seen.add(e.target):seen.delete(e.target)});sticky.classList.toggle('hide',seen.size>0)},{threshold:.15});
    ['chon-goi','dat-mua'].forEach(function(id){io.observe($(id))});
  }
  window.addEventListener('load',render);
  render();
})();
