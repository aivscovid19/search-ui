(this["webpackJsonpbreathe-ui"]=this["webpackJsonpbreathe-ui"]||[]).push([[0],{102:function(e,t,a){},126:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),i=a.n(o),s=(a(102),a(41)),c=a(12),l=a(15),h=a(165),u=a(128),m=a(174),d=a(168),f=a(169),p=a(163),v=a(167),g=a(77),b=a.n(g),O=a(78),I=a.n(O),y=a(172),C=a(31),E=a(161),w=Object(E.a)((function(){return{main:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",flexDirection:"column",marginTop:"15%"}}})),D=function(){var e=w(),t=Object(n.useState)(""),a=Object(l.a)(t,2),o=a[0],i=a[1],s=Object(c.f)(),g=function(e,t){e&&e.preventDefault(),t?s.push(encodeURI(t)):s.push(encodeURI(o))};return r.a.createElement(p.a,{className:e.main,component:"main",maxWidth:"xl"},r.a.createElement(h.a,null),r.a.createElement(u.a,{align:"center",component:"h1",variant:"h3"},"BREATHE"),r.a.createElement(u.a,{align:"center",component:"h2",variant:"h6"},"Biomedical Research Extensive Archive To Help Everyone"),r.a.createElement(p.a,{maxWidth:"sm"},r.a.createElement("form",{onSubmit:g},r.a.createElement(y.a,{autoFocus:!0,fullWidth:!0,placeholder:"search",variant:"outlined",margin:"normal",size:"small",value:o,onChange:function(e){return i(e.target.value)},InputProps:{startAdornment:r.a.createElement(v.a,{position:"start"},r.a.createElement(b.a,null)),endAdornment:r.a.createElement(v.a,{position:"end"},r.a.createElement(I.a,null))}})),r.a.createElement(u.a,{component:"p",color:"textSecondary",variant:"overline"},"Question you can try"),r.a.createElement(m.a,null,C.map((function(e,t){return r.a.createElement(m.a,{key:t,mb:2},r.a.createElement(d.a,{variant:"outlined",style:{cursor:"pointer"},onClick:function(){return g(null,e)}},r.a.createElement(f.a,null,r.a.createElement(u.a,{variant:"body2",component:"p"},e))))})))))},V=a(35),W=a.n(V),j=a(50),x=a(173),k=function(e){var t=e.initialValue,a=e.onSearch,o=Object(n.useState)(t),i=Object(l.a)(o,2),s=i[0],c=i[1],h=Object(n.useState)(""),u=Object(l.a)(h,2),m=u[0],d=u[1];return r.a.createElement(x.a,{freeSolo:!0,fullWidth:!0,placeholder:"search",variant:"outlined",size:"small",options:C,value:s,inputValue:m,onChange:function(e,t){c(t),t&&a(t)},onInputChange:function(e,t){return d(t)},renderInput:function(e){return r.a.createElement(y.a,Object.assign({},e,{placeholder:"search",variant:"outlined"}))}})},S=(Object(E.a)({questionContainer:{display:"flex",width:"100%",overflow:"scroll"},questionContent:{padding:"0.5rem !important"},question:{display:"flex",minWidth:"35%",margin:"1rem",marginBottom:"0",textAlign:"center",justifyContent:"center",alignItems:"center",cursor:"pointer","&:first-of-type":{marginLeft:"0"},"&:hover":{borderColor:"rgb(66, 66, 66)"}}}),a(82)),H=function(e,t){var a;return function(){clearTimeout(a),a=setTimeout((function(){a=null,e.apply(void 0,arguments)}),t)}},A=a(53),R=a(80),T=a.n(R),z=function(){var e=Object(j.a)(W.a.mark((function e(t){var a,n;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://us-central1-for-web-search.cloudfunctions.net/search",e.next=3,T.a.post("https://us-central1-for-web-search.cloudfunctions.net/search",{search_term:t,group:!0});case 3:return a=e.sent,n=a.data,e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function e(t){var a=t.groups,n=void 0===a?[]:a,r=t._docs,o=void 0===r?[]:r,i=Object(A.a)(o);return n.forEach((function(t){return i=[].concat(Object(A.a)(i),Object(A.a)(e(t)))})),i},L=function(e){var t=e.style,a=void 0===t?{}:t,o=e.groups,i=void 0===o?{}:o,s=e.setDocs,c=Object(n.useState)(null),h=Object(l.a)(c,2),u=h[0],m=h[1];return Object(n.useEffect)((function(){var e=new(0,window.CarrotSearchFoamTree)({id:"foamtree",maxGroupLevelsDrawn:1});e.set("onGroupClick",(function(e){var t=e.group;if(t&&t.unselectable)e.preventDefault();else if(t&&t.groups){var a=B(t);s(a)}})),m(e)}),[s]),Object(n.useEffect)((function(){u&&u.set({dataObject:{groups:i}})}),[u,i]),Object(n.useEffect)((function(){var e=H((function(){u&&u.resize()}),200);return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}})),r.a.createElement("div",{id:"foamtree",style:Object(S.a)({},a)})},q=a(129),F=a(170),N=Object(E.a)((function(){return{divider:{marginBottom:"1.5rem",boxShadow:"0px 1px 3px 1px rgba(0,0,0,0.025)"},searchResults:{height:"100%",overflow:"scroll"},searchResultsHeader:{display:"flex",alignItems:"center"},searchResultsLink:{textDecorationColor:"#000"},searchResultsTitle:{marginTop:0,marginBottom:0,fontSize:"1.5rem",fontWeight:"bold"}}})),U=function(e){var t=e.data,a=e.docs,n=e.setDocs,o=N();return 0===a.length?r.a.createElement(m.a,{display:"flex",height:"85%",justifyContent:"center",alignItems:"center"},r.a.createElement(u.a,{component:"h4",variant:"h3"},"NO RESULTS FOR QUERY")):r.a.createElement(m.a,{mt:2,display:"flex",minHeight:"85%",maxHeight:"85%"},r.a.createElement(L,{style:{flex:"50%"},groups:t,setDocs:n}),r.a.createElement(m.a,{px:2,flex:"50%",display:"flex",flexDirection:"column"},r.a.createElement(m.a,{mb:1},r.a.createElement(q.a,{variant:"outlined",square:!0},r.a.createElement(m.a,{p:1},r.a.createElement(u.a,{component:"p"},"Top 100 of 451 papers")))),r.a.createElement(m.a,{flex:"50%",className:o.searchResults},a.map((function(e,t){return r.a.createElement(m.a,{key:t,mb:2},r.a.createElement(q.a,{variant:"outlined",square:!0},r.a.createElement(m.a,{p:2},r.a.createElement(m.a,{className:o.searchResultsHeader},r.a.createElement("a",{href:"https://pubmed.ncbi.nlm.nih.gov/".concat(e.pmid),target:"_blank",rel:"noopener noreferrer",className:o.searchResultsLink},r.a.createElement(u.a,{component:"h4",variant:"h5",color:"textPrimary"},e.title))),r.a.createElement(m.a,{mt:1},r.a.createElement(u.a,{component:"p",variant:"subtitle1",color:"primary"},e.journal),r.a.createElement(u.a,{component:"p",variant:"subtitle1",color:"textPrimary"},e.abstract.length>=250?"".concat(e.abstract.slice(0,250).trim(),"..."):e.abstract)))))})))))},J=function(){var e=Object(c.g)(),t=Object(n.useState)({}),a=Object(l.a)(t,2),o=a[0],i=a[1],s=Object(n.useState)([]),d=Object(l.a)(s,2),f=d[0],p=d[1],v=Object(n.useState)(e.search),g=Object(l.a)(v,2),b=g[0],O=g[1],I=Object(n.useState)(!0),y=Object(l.a)(I,2),C=y[0],E=y[1];return Object(n.useEffect)((function(){var e=function(){var e=Object(j.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z(b);case 2:t=e.sent,a=B({groups:t}),i(t),p(a),E(!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();E(!0),e()}),[b]),r.a.createElement(r.a.Fragment,null,C?r.a.createElement(F.a,null):null,r.a.createElement(m.a,{p:3,height:"100vh"},r.a.createElement(h.a,null),r.a.createElement(m.a,{my:2},r.a.createElement(u.a,{component:"h1",variant:"h4"},"BREATHE")),r.a.createElement(k,{initialValue:e.search,onSearch:O}),C?null:r.a.createElement(U,{data:o,docs:f,setDocs:p})))},P=function(){return r.a.createElement(s.a,null,r.a.createElement(c.c,null,r.a.createElement(c.a,{exact:!0,path:"/",component:D}),r.a.createElement(c.a,{exact:!0,path:"/:search",component:J})))},_=a(171),G=a(81),Q=a(52),Y=a(51),$=Object(G.a)({palette:{secondary:{main:Q.a[900]},primary:{main:Y.a[700]}},typography:{fontFamily:['"Lato"',"sans-serif"].join(",")}}),K=function(){return r.a.createElement(_.a,{theme:$},r.a.createElement(P,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister().catch(console.error)}))},31:function(e){e.exports=JSON.parse('["What is the range of incubation periods for COVID-19 in humans?","What percentage of COVID-19 cases in humans had incubation periods of longer than 14 days?","How does the incubation period for COVID-19 in humans vary by age?","What is proof that a 14-day quarantine period is not optimal for effectively controlling COVID-19 in children?","Is there concrete evidence for the presence of asymptomatic transmissions?","What is the basic reproductive number for the novel coronavirus?","What is evidence that the novel covonavirus can be transmitted through fecal excretion?","Will the number of COVID-19 cases decline in the summer?","What does the literature say about the effect of temperature variation and humidity on the mortality rate of COVID-19 in Wuhan?","How long can coronavirus persist on different surfaces?","How long can HCoV-19 survive on aerosols?","How long can HCoV-19 persist on plastic and stainless steel?","What is some evidence that recovered COVID-19 patients can get reinfected?","For how many hours can HCoV-19 survive on cardboard?","How long can SARS-CoV-2 stay on copper?","What is the reproduction number of COVID-19?","How do we know that hypertension is a risk factor of COVID-19?","What is some evidence that diabetes poses a potential risk factor to COVID-19?","Is heart disease a potential risk factor for COVID-19?","Are obese people more at risk to COVID-19?","What is the relationship between pregnancy and COVID-19?","Do people who smoke have a higher risk from COVID-19?","How short is the serial interval for COVID-19?","What feature of Indian SARS-CoV-2 is absent in other strands?","When was the first human case of COVID-19 reported?","What is the recommended length of quarantine?","What meteorological factors may impact COVID-19 death?","What facility was responsible for significantly decreasing COVID-19 mortality in Wuhan and Hubei?","Is being diagnosed with coronavirus the same as being diagnosed as COVID-19?","Why is the disease being called COVID-19?","How can people help stop stigma related to COVID-19?","What other coronavirus strands that infect humans originated from animals?","What is community spread?","Why are we seeing a rise in COVID-19 cases in the United States?","How long do COVID-19 patients have to be isolated?","What are current CDC guidelines to determine whether a COVID-19 patient may be released from isolation?","Is a COVID-19 who has recovered considered a risk to others?","Can the COVID-19 virus be spread through food","What temperature kills HCoV-19?","What is the most common way that coronavirus spreads?","Is it safe to donate blood?","Are children at a higher risk of becoming sick with COVID-19 than adults?","Are the symptoms of COVID-19 different in children than in adults?","What are some symptoms of COVID-19 in children?","What should I do if someone in my house gets sick with COVID-19?","Should I use soap and water or a hand sanitizer to protect against COVID-19?","Should I make my own hand sanitizer if I can\'t find it in the stores?","Am I safe if I tested negative for COVID-19?","What does well controlled mean?","What does more severe illness mean?","Are people with disabilities at higher risk?","Am I at risk if I go to a funeral or visitation service for someone who died of COVID-19?","Am I at risk if I touch someone who died of COVID-19 after they have passed away?","Do I need to get my pet tested for COVID-19?","Can animals carry the virus that causes COVID-19 on their skin or fur?","Should I avoid contact with pets or other animals if I am sick with COVID-19?","Can children still hang out with their friends?","What diseases are caused by coronavirus?","What are the symptoms of COVID-19?","What percentage of people infected with COVID-19 recover without needing special treatment?","What can I do to protect myself against COVID-19?","What should someone who has visited areas heavily infected with COVID-19 do?","How likely is it for someone to catch COVID-19?","How many people who catch COVID-19 need hospital care?","Who is most prone to develop serious illness?","Why are antibiotics not effective against COVID-19?","Are there any medicines or therapies that can prevent or cure COVID-19?","Is there a vaccine","Is COVID-19 the same as SARS?","Can I catch COVID-19 from my pet?","Is it safe to receive a package from any area where COVID-19 has been reported?","According to the WHO","Is COVID-19 airborne?"]')},97:function(e,t,a){e.exports=a(126)}},[[97,1,2]]]);
//# sourceMappingURL=main.16861e4e.chunk.js.map