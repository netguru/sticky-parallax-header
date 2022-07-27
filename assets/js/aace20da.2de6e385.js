"use strict";(self.webpackChunkreact_native_sticky_parallax_header_docs=self.webpackChunkreact_native_sticky_parallax_header_docs||[]).push([[706],{3905:function(e,n,r){r.d(n,{Zo:function(){return p},kt:function(){return d}});var t=r(7294);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function a(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function s(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=t.createContext({}),c=function(e){var n=t.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):a(a({},n),e)),r},p=function(e){var n=c(e.components);return t.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},f=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=c(r),d=o,m=f["".concat(l,".").concat(d)]||f[d]||u[d]||i;return r?t.createElement(m,a(a({ref:n},p),{},{components:r})):t.createElement(m,a({ref:n},p))}));function d(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=f;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=r[c];return t.createElement.apply(null,a)}return t.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1835:function(e,n,r){r.r(n),r.d(n,{assets:function(){return p},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var t=r(3117),o=r(102),i=(r(7294),r(3905)),a=["components"],s={sidebar_position:2},l="Pull to refresh",c={unversionedId:"guides/pull-to-refresh",id:"guides/pull-to-refresh",title:"Pull to refresh",description:"All exported components inherits props of their underlying scroll component, to use default refresh control, just pass onRefresh & refreshing props. If you want to have custom setup (e.g. custom style), pass component as refreshControl prop",source:"@site/docs/guides/pull-to-refresh.md",sourceDirName:"guides",slug:"/guides/pull-to-refresh",permalink:"/sticky-parallax-header/docs/next/guides/pull-to-refresh",draft:!1,editUrl:"https://github.com/netguru/sticky-parallax-header/tree/master/docs/docs/guides/pull-to-refresh.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Scroll component reference",permalink:"/sticky-parallax-header/docs/next/guides/scrollview-reference"},next:{title:"Rendering icons in tabs",permalink:"/sticky-parallax-header/docs/next/guides/icons-in-tabs"}},p={},u=[],f={toc:u};function d(e){var n=e.components,r=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,t.Z)({},f,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"pull-to-refresh"},"Pull to refresh"),(0,i.kt)("p",null,"All exported components inherits props of their underlying scroll component, to use default refresh control, just pass ",(0,i.kt)("inlineCode",{parentName:"p"},"onRefresh")," & ",(0,i.kt)("inlineCode",{parentName:"p"},"refreshing")," props. If you want to have custom setup (e.g. custom style), pass component as ",(0,i.kt)("inlineCode",{parentName:"p"},"refreshControl")," prop"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"  <StickyHeaderScrollView\n    // ...\n    onRefresh={onRefresh}\n    refreshing={refreshing}\n    // ...\n  >\n    {/** content */}\n  </StickyHeaderScrollView>\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},'  <StickyHeaderScrollView\n    // ...\n    refreshControl={\n      <RefreshControl\n        // z Index is required on IOS, to refresh indicator be visible\n        style={{ zIndex: 1 }}\n        refreshing={refreshing}\n        titleColor="white"\n        tintColor="white"\n        title="Refreshing"\n        onRefresh={onRefresh}\n      />\n    }\n    // ...\n  >\n    {/** content */}\n  </StickyHeaderScrollView>\n')),(0,i.kt)("admonition",{type:"warning"},(0,i.kt)("p",{parentName:"admonition"},"using ",(0,i.kt)("inlineCode",{parentName:"p"},"RefreshControl")," on web, can break sticky header layout, because web implementation is just stubbed and doubles ScrollView's margin/padding"),(0,i.kt)("p",{parentName:"admonition"},"to handle that, use it only when platform is not web"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"{...Platform.select({ default: { onRefresh, refreshing }, web: undefined })}\n")),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},'refreshControl={\n  Platform.select({\n    default: (\n      <RefreshControl\n        // z Index is required on IOS, to refresh indicator be visible\n        style={{ zIndex: 1 }}\n        refreshing={refreshing}\n        titleColor="white"\n        tintColor="white"\n        title="Refreshing"\n        onRefresh={onRefresh}\n      />\n    ),\n    web: undefined,\n  })\n}\n'))))}d.isMDXComponent=!0}}]);