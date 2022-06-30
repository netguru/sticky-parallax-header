"use strict";(self.webpackChunkreact_native_sticky_parallax_header_docs=self.webpackChunkreact_native_sticky_parallax_header_docs||[]).push([[2578],{3905:function(t,e,a){a.d(e,{Zo:function(){return s},kt:function(){return k}});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var d=n.createContext({}),p=function(t){var e=n.useContext(d),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},s=function(t){var e=p(t.components);return n.createElement(d.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,d=t.parentName,s=o(t,["components","mdxType","originalType","parentName"]),m=p(a),k=r,c=m["".concat(d,".").concat(k)]||m[k]||u[k]||l;return a?n.createElement(c,i(i({ref:e},s),{},{components:a})):n.createElement(c,i({ref:e},s))}));function k(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=m;var o={};for(var d in e)hasOwnProperty.call(e,d)&&(o[d]=e[d]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var p=2;p<l;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},3400:function(t,e,a){a.r(e),a.d(e,{assets:function(){return s},contentTitle:function(){return d},default:function(){return k},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return u}});var n=a(3117),r=a(102),l=(a(7294),a(3905)),i=["components"],o={sidebar_position:3},d="Details Header",p={unversionedId:"headers/details-header",id:"headers/details-header",title:"Details Header",description:"Details Header Gif",source:"@site/docs/headers/details-header.md",sourceDirName:"headers",slug:"/headers/details-header",permalink:"/sticky-parallax-header/docs/next/headers/details-header",draft:!1,editUrl:"https://github.com/netguru/sticky-parallax-header/tree/master/docs/docs/headers/details-header.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Tabbed Header List",permalink:"/sticky-parallax-header/docs/next/headers/tabbed-header-list"},next:{title:"Avatar Header",permalink:"/sticky-parallax-header/docs/next/headers/avatar-header"}},s={},u=[{value:"Example usage",id:"example-usage",level:2},{value:"Props",id:"props",level:2},{value:"DetailsHeaderScrollView props",id:"detailsheaderscrollview-props",level:3},{value:"DetailsHeaderFlatList props",id:"detailsheaderflatlist-props",level:3},{value:"DetailsHeaderFlatList props",id:"detailsheaderflatlist-props-1",level:3},{value:"Shared DetailsHeader props",id:"shared-detailsheader-props",level:3}],m={toc:u};function k(t){var e=t.components,o=(0,r.Z)(t,i);return(0,l.kt)("wrapper",(0,n.Z)({},m,o,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"details-header"},"Details Header"),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"Details Header Gif",src:a(9819).Z,width:"244",height:"480"})),(0,l.kt)("h2",{id:"example-usage"},"Example usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from \'react\'\nimport {\n  DetailsHeaderScrollView,\n  DetailsHeaderFlatList,\n  DetailsHeaderSectionList,\n} from \'react-native-sticky-parallax-header\'\n\nexport const TestScrollViewScreen = () => (\n  <>\n    <DetailsHeaderScrollView\n      leftTopIcon={require(\'<path-to-details-left-icon>\')}\n      image={{ uri: \'<path-to-details-image>\' }}\n      backgroundColor="green"\n      tag="Details type"\n      title="Details title"\n    >\n      {/** scroll view content */}\n    </DetailsHeaderScrollView>\n  </>\n)\n\nexport const TestFlatListScreen = () => (\n  <>\n    <DetailsHeaderFlatList\n      {...flatListProps}\n      leftTopIcon={require(\'<path-to-details-left-icon>\')}\n      image={{ uri: \'<path-to-details-image>\' }}\n      backgroundColor="green"\n      tag="Details type"\n      title="Details title"\n    />\n  </>\n)\n\nexport const TestSectionListScreen = () => (\n  <>\n    <DetailsHeaderSectionList\n      {...sectionListProps}\n      leftTopIcon={require(\'<path-to-details-left-icon>\')}\n      image={{ uri: \'<path-to-details-image>\' }}\n      backgroundColor="green"\n      tag="Details type"\n      title="Details title"\n    />\n  </>\n)\n')),(0,l.kt)("h2",{id:"props"},"Props"),(0,l.kt)("h3",{id:"detailsheaderscrollview-props"},"DetailsHeaderScrollView props"),(0,l.kt)("p",null,"Inherits ",(0,l.kt)("a",{parentName:"p",href:"https://reactnative.dev/docs/next/scrollview#props"},"ScrollViewProps")," and ",(0,l.kt)("a",{parentName:"p",href:"#shared-detailsheader-props"},"Shared DetailsHeader props")),(0,l.kt)("h3",{id:"detailsheaderflatlist-props"},"DetailsHeaderFlatList props"),(0,l.kt)("p",null,"Inherits ",(0,l.kt)("a",{parentName:"p",href:"https://reactnative.dev/docs/next/flatlist#props"},"FlatListProps")," and ",(0,l.kt)("a",{parentName:"p",href:"#shared-detailsheader-props"},"Shared DetailsHeader props")),(0,l.kt)("h3",{id:"detailsheaderflatlist-props-1"},"DetailsHeaderFlatList props"),(0,l.kt)("p",null,"Inherits ",(0,l.kt)("a",{parentName:"p",href:"https://reactnative.dev/docs/next/sectionlist#props"},"SectionListProps")," and ",(0,l.kt)("a",{parentName:"p",href:"#shared-detailsheader-props"},"Shared DetailsHeader props")),(0,l.kt)("h3",{id:"shared-detailsheader-props"},"Shared DetailsHeader props"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Prop"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Default value"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"backgroundColor"),(0,l.kt)("td",{parentName:"tr",align:null},"color - ",(0,l.kt)("inlineCode",{parentName:"td"},"ColorValue")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"backgroundImage"),(0,l.kt)("td",{parentName:"tr",align:null},"image source - ",(0,l.kt)("inlineCode",{parentName:"td"},"ImageSourcePropType")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"containerStyle"),(0,l.kt)("td",{parentName:"tr",align:null},"style - ",(0,l.kt)("inlineCode",{parentName:"td"},"StyleProp<ViewStyle>")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"contentIcon"),(0,l.kt)("td",{parentName:"tr",align:null},"image source - ",(0,l.kt)("inlineCode",{parentName:"td"},"ImageSourcePropType")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"contentIconNumber"),(0,l.kt)("td",{parentName:"tr",align:null},"number"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"contentIconNumberStyle"),(0,l.kt)("td",{parentName:"tr",align:null},"style - ",(0,l.kt)("inlineCode",{parentName:"td"},"StyleProp<TextStyle>")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"leftTopIcon"),(0,l.kt)("td",{parentName:"tr",align:null},"render function or image source"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"leftTopIconAccessibilityLabel"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"leftTopIconOnPress"),(0,l.kt)("td",{parentName:"tr",align:null},"function - ",(0,l.kt)("inlineCode",{parentName:"td"},"() => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"leftTopIconTestID"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"hasBorderRadius"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"headerHeight"),(0,l.kt)("td",{parentName:"tr",align:null},"number"),(0,l.kt)("td",{parentName:"tr",align:null},"100")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"image"),(0,l.kt)("td",{parentName:"tr",align:null},"image source - ",(0,l.kt)("inlineCode",{parentName:"td"},"ImageSourcePropType")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onHeaderLayout"),(0,l.kt)("td",{parentName:"tr",align:null},"function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: LayoutChangeEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onMomentumScrollBegin"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onMomentumScrollEnd"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onScroll"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onScrollBeginDrag"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onScrollEndDrag"),(0,l.kt)("td",{parentName:"tr",align:null},"worklet function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: NativeScrollEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onTabsLayout"),(0,l.kt)("td",{parentName:"tr",align:null},"function - ",(0,l.kt)("inlineCode",{parentName:"td"},"(e: LayoutChangeEvent) => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"onTopReached"),(0,l.kt)("td",{parentName:"tr",align:null},"function - ",(0,l.kt)("inlineCode",{parentName:"td"},"() => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"parallaxHeight"),(0,l.kt)("td",{parentName:"tr",align:null},"number"),(0,l.kt)("td",{parentName:"tr",align:null},"53% of screen's height")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"renderHeaderBar"),(0,l.kt)("td",{parentName:"tr",align:null},"render function"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"rightTopIcon"),(0,l.kt)("td",{parentName:"tr",align:null},"render function or image source"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"rightTopIconAccessibilityLabel"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"rightTopIconOnPress"),(0,l.kt)("td",{parentName:"tr",align:null},"function - ",(0,l.kt)("inlineCode",{parentName:"td"},"() => void")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"rightTopIconTestID"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"snapStartThreshold"),(0,l.kt)("td",{parentName:"tr",align:null},"number"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"snapStopThreshold"),(0,l.kt)("td",{parentName:"tr",align:null},"number"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"snapToEdge"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"true")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"tabsContainerBackgroundColor"),(0,l.kt)("td",{parentName:"tr",align:null},"color - ",(0,l.kt)("inlineCode",{parentName:"td"},"ColorValue")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"tag"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"tagStyle"),(0,l.kt)("td",{parentName:"tr",align:null},"style - ",(0,l.kt)("inlineCode",{parentName:"td"},"StyleProp<TextStyle>")),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"title"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"-")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"titleStyle"),(0,l.kt)("td",{parentName:"tr",align:null},"style - ",(0,l.kt)("inlineCode",{parentName:"td"},"StyleProp<TextStyle>")),(0,l.kt)("td",{parentName:"tr",align:null},"-")))))}k.isMDXComponent=!0},9819:function(t,e,a){e.Z=a.p+"assets/images/readme_Details-6d62e496eae0878debe41d952220e3e4.gif"}}]);