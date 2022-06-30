"use strict";(self.webpackChunkreact_native_sticky_parallax_header_docs=self.webpackChunkreact_native_sticky_parallax_header_docs||[]).push([[2437],{3905:function(e,r,n){n.d(r,{Zo:function(){return u},kt:function(){return f}});var t=n(7294);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function c(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=t.createContext({}),s=function(e){var r=t.useContext(a),n=r;return e&&(n="function"==typeof e?e(r):l(l({},r),e)),n},u=function(e){var r=s(e.components);return t.createElement(a.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},d=t.forwardRef((function(e,r){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(n),f=o,m=d["".concat(a,".").concat(f)]||d[f]||p[f]||i;return n?t.createElement(m,l(l({ref:r},u),{},{components:n})):t.createElement(m,l({ref:r},u))}));function f(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=d;var c={};for(var a in r)hasOwnProperty.call(r,a)&&(c[a]=r[a]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var s=2;s<i;s++)l[s]=n[s];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2198:function(e,r,n){n.r(r),n.d(r,{assets:function(){return u},contentTitle:function(){return a},default:function(){return f},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return p}});var t=n(3117),o=n(102),i=(n(7294),n(3905)),l=["components"],c={sidebar_position:1},a="Scroll component reference",s={unversionedId:"guides/scrollview-reference",id:"version-1.0.x/guides/scrollview-reference",title:"Scroll component reference",description:"Handling reference to underlying ScrollView, FlatList or SectionList",source:"@site/versioned_docs/version-1.0.x/guides/scrollview-reference.md",sourceDirName:"guides",slug:"/guides/scrollview-reference",permalink:"/sticky-parallax-header/docs/guides/scrollview-reference",draft:!1,editUrl:"https://github.com/netguru/sticky-parallax-header/tree/master/docs/versioned_docs/version-1.0.x/guides/scrollview-reference.md",tags:[],version:"1.0.x",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Custom Header",permalink:"/sticky-parallax-header/docs/examples/custom-header"},next:{title:"Pull to refresh",permalink:"/sticky-parallax-header/docs/guides/pull-to-refresh"}},u={},p=[{value:"Handling reference to underlying <code>ScrollView</code>, <code>FlatList</code> or <code>SectionList</code>",id:"handling-reference-to-underlying-scrollview-flatlist-or-sectionlist",level:2}],d={toc:p};function f(e){var r=e.components,n=(0,o.Z)(e,l);return(0,i.kt)("wrapper",(0,t.Z)({},d,n,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"scroll-component-reference"},"Scroll component reference"),(0,i.kt)("h2",{id:"handling-reference-to-underlying-scrollview-flatlist-or-sectionlist"},"Handling reference to underlying ",(0,i.kt)("inlineCode",{parentName:"h2"},"ScrollView"),", ",(0,i.kt)("inlineCode",{parentName:"h2"},"FlatList")," or ",(0,i.kt)("inlineCode",{parentName:"h2"},"SectionList")),(0,i.kt)("p",null,"All exported components forward refs to underlying scroll component, to access it, just pass ref like when using conventional ",(0,i.kt)("inlineCode",{parentName:"p"},"ScrollView"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"FlatList")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"SectionList")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"const paralaxScrollRef = useRef(null);\n\n<StickyHeaderScrollView\n  ref={paralaxScrollRef}\n  //...\n>\n  {renderBody()}\n</StickyHeaderScrollView>\n")))}f.isMDXComponent=!0}}]);