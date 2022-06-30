"use strict";(self.webpackChunkreact_native_sticky_parallax_header_docs=self.webpackChunkreact_native_sticky_parallax_header_docs||[]).push([[1356],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var d=n.createContext({}),p=function(e){var t=n.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,d=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(r),m=a,k=u["".concat(d,".").concat(m)]||u[m]||s[m]||l;return r?n.createElement(k,o(o({ref:t},c),{},{components:r})):n.createElement(k,o({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=u;var i={};for(var d in t)hasOwnProperty.call(t,d)&&(i[d]=t[d]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4242:function(e,t,r){r.r(t),r.d(t,{assets:function(){return c},contentTitle:function(){return d},default:function(){return m},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return s}});var n=r(3117),a=r(102),l=(r(7294),r(3905)),o=["components"],i={sidebar_position:5},d="Custom Sticky Header",p={unversionedId:"headers/custom-header",id:"headers/custom-header",title:"Custom Sticky Header",description:"Example usage",source:"@site/docs/headers/custom-header.md",sourceDirName:"headers",slug:"/headers/custom-header",permalink:"/sticky-parallax-header/docs/next/headers/custom-header",draft:!1,editUrl:"https://github.com/netguru/sticky-parallax-header/tree/master/docs/docs/headers/custom-header.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Avatar Header",permalink:"/sticky-parallax-header/docs/next/headers/avatar-header"},next:{title:"Custom Tabbed Header",permalink:"/sticky-parallax-header/docs/next/examples/custom-tabbed-header"}},c={},s=[{value:"Example usage",id:"example-usage",level:2},{value:"Props",id:"props",level:2},{value:"StickyHeaderScrollViewProps",id:"stickyheaderscrollviewprops",level:3},{value:"StickyHeaderFlatListProps",id:"stickyheaderflatlistprops",level:3},{value:"StickyHeaderSectionListProps",id:"stickyheadersectionlistprops",level:3},{value:"Shared StickyHeader props",id:"shared-stickyheader-props",level:3}],u={toc:s};function m(e){var t=e.components,r=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"custom-sticky-header"},"Custom Sticky Header"),(0,l.kt)("h2",{id:"example-usage"},"Example usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport { View } from 'react-native';\nimport {\n  StickyHeaderScrollView,\n  useStickyHeaderScrollProps,\n} from 'react-native-sticky-parallax-header';\n\nconst PARALLAX_HEIGHT = 330;\nconst HEADER_BAR_HEIGHT = 92;\nconst SNAP_START_THRESHOLD = 50;\nconst SNAP_STOP_THRESHOLD = 330;\n\nconst TestScreen = () => {\n  const {\n    onMomentumScrollEnd,\n    onScroll,\n    onScrollEndDrag,\n    scrollHeight,\n    scrollValue,\n    scrollViewRef,\n  } = useStickyHeaderScrollProps({\n    parallaxHeight: PARALLAX_HEIGHT,\n    snapStartThreshold: SNAP_START_THRESHOLD,\n    snapStopThreshold: SNAP_STOP_THRESHOLD,\n    snapToEdge: true,\n  });\n\n  return (\n    <View>\n      {/** render header bar */}\n      <View>\n        <StickyHeaderScrollView\n          ref={scrollViewRef}\n          onScroll={onScroll}\n          onMomentumScrollEnd={onMomentumScrollEnd}\n          onScrollEndDrag={onScrollEndDrag}\n          renderHeader={() => {\n            return (\n              <View style={{ height: scrollHeight }}>\n                {/** render header foreground */}\n              </View>\n            );\n          }}>\n          {/** render scroll view content */}\n        </StickyHeaderScrollView>\n      </View>\n    </View>\n  );\n}\n")),(0,l.kt)("h2",{id:"props"},"Props"),(0,l.kt)("h3",{id:"stickyheaderscrollviewprops"},"StickyHeaderScrollViewProps"),(0,l.kt)("p",null,"Inherits ",(0,l.kt)("a",{parentName:"p",href:"https://reactnative.dev/docs/next/scrollview#props"},"ScrollViewProps")," and ",(0,l.kt)("a",{parentName:"p",href:"#shared-stickyheader-props"},"Shared StickyHeader props")),(0,l.kt)("h3",{id:"stickyheaderflatlistprops"},"StickyHeaderFlatListProps"),(0,l.kt)("p",null,"Inherits ",(0,l.kt)("a",{parentName:"p",href:"https://reactnative.dev/docs/next/flatlist#props"},"FlatListProps")," and ",(0,l.kt)("a",{parentName:"p",href:"#shared-stickyheader-props"},"Shared StickyHeader props")),(0,l.kt)("h3",{id:"stickyheadersectionlistprops"},"StickyHeaderSectionListProps"),(0,l.kt)("p",null,"Inherits ",(0,l.kt)("a",{parentName:"p",href:"https://reactnative.dev/docs/next/sectionlist#props"},"SectionListProps")," and ",(0,l.kt)("a",{parentName:"p",href:"#shared-stickyheader-props"},"Shared StickyHeader props")),(0,l.kt)("h3",{id:"shared-stickyheader-props"},"Shared StickyHeader props"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Prop"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Default value"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"containerStyle"),(0,l.kt)("td",{parentName:"tr",align:null},"style - ",(0,l.kt)("inlineCode",{parentName:"td"},"StyleProp<ViewStyle>")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onHeaderLayout"),(0,l.kt)("td",{parentName:"tr",align:null},"function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: LayoutChangeEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onMomentumScrollBegin"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onMomentumScrollEnd"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onScroll"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onScrollBeginDrag"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onScrollEndDrag"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onTabsLayout"),(0,l.kt)("td",{parentName:"tr",align:null},"function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: LayoutChangeEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"renderHeader"),(0,l.kt)("td",{parentName:"tr",align:null},"render function"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"renderTabs"),(0,l.kt)("td",{parentName:"tr",align:null},"render function"),(0,l.kt)("td",{parentName:"tr",align:null},"-")))))}m.isMDXComponent=!0}}]);