(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{25:function(e,n,t){},45:function(e,n,t){"use strict";t.r(n);var a=t(1),c=t.n(a),r=t(19),o=t.n(r),u=(t(25),t(20)),s=t(10),i=t(3),l=t(0),d=function(e){var n=e.newSearch,t=e.handleSearchChange;return Object(l.jsxs)("div",{children:["filter shown with: ",Object(l.jsx)("input",{value:n,onChange:t,autoComplete:"none"})]})},j=function(e){var n=e.persons,t=e.newSearch,a=e.handleDelete;return n=n.filter((function(e){return null!==e})),Object(l.jsx)("div",{children:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(l.jsxs)("p",{children:[e.name,": ",e.number,Object(l.jsx)("button",{"data-id":e.id,"data-name":e.name,onClick:a,children:"Delete"})]},e.name)}))})},b=function(e){var n=e.addnewName,t=e.newName,a=e.newNumber,c=e.handlenNameChange,r=e.handlenNumberChange;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:n,children:[Object(l.jsxs)("div",{children:["name: ",Object(l.jsx)("input",{value:t,onChange:c,autoComplete:"none"}),Object(l.jsx)("br",{}),"number: ",Object(l.jsx)("input",{value:a,onChange:r,autoComplete:"none"})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]})})},h=function(e){var n=e.classname,t=e.message;return null===t?null:Object(l.jsx)("div",{className:n,children:t})},m=t(5),f=t.n(m),O="/api/persons",p=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),o=Object(i.a)(r,2),m=o[0],p=o[1],g=Object(a.useState)(""),x=Object(i.a)(g,2),v=x[0],w=x[1],C=Object(a.useState)(""),S=Object(i.a)(C,2),N=S[0],k=S[1],D=Object(a.useState)(null),y=Object(i.a)(D,2),F=y[0],T=y[1],L=Object(a.useState)(null),P=Object(i.a)(L,2),A=P[0],B=P[1];Object(a.useEffect)((function(){f.a.get(O).then((function(e){return e.data})).then((function(e){c(e)}))}),[]);return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(h,{classname:"success",message:F}),Object(l.jsx)(h,{classname:"error",message:A}),Object(l.jsx)("h3",{children:"Filter"}),Object(l.jsx)(d,{newSearch:N,handleSearchChange:function(e){k(e.target.value)}}),Object(l.jsx)("h3",{children:"Add new"}),Object(l.jsx)(b,{addnewName:function(e){e.preventDefault();var n,a,r={name:m,number:v};if(t.some((function(e){return e.name===r.name}))){if(window.confirm("".concat(r.name," is already added, replace the number?"))){var o=t.find((function(e){return e.name===r.name})),i=Object(s.a)(Object(s.a)({},o),{},{number:v});console.log(i),(n=o.id,a=i,f.a.put("".concat(O,"/").concat(n),a).then((function(e){return e.data}))).then((function(e){c(t.map((function(n){return n.id!==o.id?n:e}))),p(""),w("")})).catch((function(e){console.log(e.response),404===e.response.status?(B("".concat(o.name," was already deleted from the phonebook")),c(t.filter((function(e){return e.id!==o.id})))):B(e.response.data.error),setTimeout((function(){B(null)}),5e3)}))}}else(function(e){return f.a.post(O,e).then((function(e){return e.data}))})(r).then((function(e){c([].concat(Object(u.a)(t),[e])),p(""),w(""),T("".concat(r.name," was successfully added")),setTimeout((function(){T(null)}),5e3)})).catch((function(e){B(e.response.data.error),setTimeout((function(){B(null)}),5e3)}))},newName:m,newNumber:v,handlenNameChange:function(e){p(e.target.value)},handlenNumberChange:function(e){w(e.target.value)}}),Object(l.jsx)("h3",{children:"Numbers"}),Object(l.jsx)(j,{persons:t,newSearch:N,handleDelete:function(e){var n;window.confirm("Deseas borrar a ".concat(e.target.dataset.name))&&(n=e.target.dataset.id,f.a.delete("".concat(O,"/").concat(n)).then((function(e){return e.data})),c(t.filter((function(n){return n.id!==e.target.dataset.id}))))}})]})},g=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,46)).then((function(n){var t=n.getCLS,a=n.getFID,c=n.getFCP,r=n.getLCP,o=n.getTTFB;t(e),a(e),c(e),r(e),o(e)}))};o.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(p,{})}),document.getElementById("root")),g()}},[[45,1,2]]]);
//# sourceMappingURL=main.94dba194.chunk.js.map