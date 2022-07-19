"use strict";(self.webpackChunkreact_native_sticky_parallax_header_docs=self.webpackChunkreact_native_sticky_parallax_header_docs||[]).push([[1248],{3905:function(e,r,n){n.d(r,{Zo:function(){return u},kt:function(){return p}});var t=n(7294);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function l(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function o(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?l(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function c(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)n=l[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=t.createContext({}),s=function(e){var r=t.useContext(i),n=r;return e&&(n="function"==typeof e?e(r):o(o({},r),e)),n},u=function(e){var r=s(e.components);return t.createElement(i.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},f=t.forwardRef((function(e,r){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),f=s(n),p=a,y=f["".concat(i,".").concat(p)]||f[p]||d[p]||l;return n?t.createElement(y,o(o({ref:r},u),{},{components:n})):t.createElement(y,o({ref:r},u))}));function p(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=f;var c={};for(var i in r)hasOwnProperty.call(r,i)&&(c[i]=r[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<l;s++)o[s]=n[s];return t.createElement.apply(null,o)}return t.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9648:function(e,r,n){n.r(r),n.d(r,{assets:function(){return u},contentTitle:function(){return i},default:function(){return p},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return d}});var t=n(3117),a=n(102),l=(n(7294),n(3905)),o=["components"],c={sidebar_position:1},i="ScrollView reference",s={unversionedId:"guides/scrollview-reference",id:"version-0.4.x/guides/scrollview-reference",title:"ScrollView reference",description:"Handling StickyParallaxHeader body ScrollView reference",source:"@site/versioned_docs/version-0.4.x/guides/scrollview-reference.md",sourceDirName:"guides",slug:"/guides/scrollview-reference",permalink:"/sticky-parallax-header/docs/0.4.x/guides/scrollview-reference",draft:!1,editUrl:"https://github.com/netguru/sticky-parallax-header/tree/master/docs/versioned_docs/version-0.4.x/guides/scrollview-reference.md",tags:[],version:"0.4.x",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Custom Header",permalink:"/sticky-parallax-header/docs/0.4.x/examples/custom-header"},next:{title:"Handling nested scrollables",permalink:"/sticky-parallax-header/docs/0.4.x/guides/nested-scrollables"}},u={},d=[{value:"Handling StickyParallaxHeader body ScrollView reference",id:"handling-stickyparallaxheader-body-scrollview-reference",level:2},{value:"As callback function",id:"as-callback-function",level:3},{value:"As useRef value",id:"as-useref-value",level:3}],f={toc:d};function p(e){var r=e.components,n=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,t.Z)({},f,n,{components:r,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"scrollview-reference"},"ScrollView reference"),(0,l.kt)("h2",{id:"handling-stickyparallaxheader-body-scrollview-reference"},"Handling StickyParallaxHeader body ScrollView reference"),(0,l.kt)("h3",{id:"as-callback-function"},"As callback function"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-tsx"},"<StickyParallaxHeader\n  scrollRef={(ref) => {\n    paralaxScrollRef.current = ref;\n  }}\n  foreground={this.renderForeground()}\n  header={this.renderHeader()}\n>\n  {renderBody()}\n</StickyParallaxHeader>\n")),(0,l.kt)("h3",{id:"as-useref-value"},"As useRef value"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-tsx"},"const paralaxScrollRef = useRef(null);\n<StickyParallaxHeader\n  scrollRef={paralaxScrollRef}\n  foreground={this.renderForeground()}\n  header={this.renderHeader()}\n>\n  {renderBody()}\n</StickyParallaxHeader>\n")))}p.isMDXComponent=!0}}]);