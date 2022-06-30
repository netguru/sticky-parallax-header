"use strict";(self.webpackChunkreact_native_sticky_parallax_header_docs=self.webpackChunkreact_native_sticky_parallax_header_docs||[]).push([[7417],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return f}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=u(t),f=o,b=d["".concat(s,".").concat(f)]||d[f]||l[f]||i;return t?r.createElement(b,a(a({ref:n},p),{},{components:t})):r.createElement(b,a({ref:n},p))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=d;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var u=2;u<i;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3053:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return l}});var r=t(3117),o=t(102),i=(t(7294),t(3905)),a=["components"],c={sidebar_position:3},s="Rendering icons in tabs",u={unversionedId:"guides/icons-in-tabs",id:"version-1.0.x/guides/icons-in-tabs",title:"Rendering icons in tabs",description:"You can pass just React component to icon property in tabs object. If you need different active icon use function, example below.",source:"@site/versioned_docs/version-1.0.x/guides/icons-in-tabs.md",sourceDirName:"guides",slug:"/guides/icons-in-tabs",permalink:"/sticky-parallax-header/docs/guides/icons-in-tabs",draft:!1,editUrl:"https://github.com/netguru/sticky-parallax-header/tree/master/docs/versioned_docs/version-1.0.x/guides/icons-in-tabs.md",tags:[],version:"1.0.x",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Pull to refresh",permalink:"/sticky-parallax-header/docs/guides/pull-to-refresh"}},p={},l=[],d={toc:l};function f(e){var n=e.components,t=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"rendering-icons-in-tabs"},"Rendering icons in tabs"),(0,i.kt)("p",null,"You can pass just React component to ",(0,i.kt)("inlineCode",{parentName:"p"},"icon")," property in tabs object. If you need different active icon use function, example below."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"<TabbedHeaderPager\n  tabs={[\n    {\n      title: 'Development',\n      icon: (active) => (active ? <ActiveIcon /> : <Icon />),\n    },\n  ]}\n  // ...\n>\n  {/** content */}\n</TabbedHeaderPager>\n")))}f.isMDXComponent=!0}}]);