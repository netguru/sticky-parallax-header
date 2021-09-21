(self.webpackChunkreact_native_sticky_parallax_header=self.webpackChunkreact_native_sticky_parallax_header||[]).push([[244],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return d},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(n),f=o,m=p["".concat(s,".").concat(f)]||p[f]||u[f]||a;return n?r.createElement(m,i(i({ref:t},d),{},{components:n})):r.createElement(m,i({ref:t},d))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4503:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return d},default:function(){return p}});var r=n(2122),o=n(9756),a=(n(7294),n(3905)),i=["components"],l={sidebar_position:2},s="Handling nested scrollables",c={unversionedId:"guides/nested-scrollables",id:"guides/nested-scrollables",isDocsHomePage:!1,title:"Handling nested scrollables",description:"In order to nest scrollable component use scrollEnabled= on it and move all the logic to the header eg. by using onEndReached and onTopReached props. You can find example in CardScreen.tsx it's really basic so probably you will want to extend it somehow:",source:"@site/docs/guides/nested-scrollables.md",sourceDirName:"guides",slug:"/guides/nested-scrollables",permalink:"/sticky-parallax-header/docs/guides/nested-scrollables",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/guides/nested-scrollables.md",version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"ScrollView reference",permalink:"/sticky-parallax-header/docs/guides/scrollview-reference"},next:{title:"Pull to refresh",permalink:"/sticky-parallax-header/docs/guides/pull-to-refresh"}},d=[],u={toc:d};function p(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"handling-nested-scrollables"},"Handling nested scrollables"),(0,a.kt)("p",null,"In order to nest scrollable component use ",(0,a.kt)("inlineCode",{parentName:"p"},"scrollEnabled={false}")," on it and move all the logic to the header eg. by using ",(0,a.kt)("inlineCode",{parentName:"p"},"onEndReached")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"onTopReached")," props. You can find example in CardScreen.tsx it's really basic so probably you will want to extend it somehow:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"shouldBeEnabled = () => {\n  const { endReached, stickyHeaderEndReached, topReached, stickyHeaderTopReached } = this.state;\n  const bottomCondition = endReached && stickyHeaderEndReached;\n  const topCondition = topReached && stickyHeaderTopReached;\n  return bottomCondition || !topCondition;\n};\n\nonScroll = ({ nativeEvent }) => {\n  const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;\n  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {\n    this.setState({ endReached: true, topReached: false });\n  }\n\n  if (contentOffset.y <= 0) {\n    this.setState({ topReached: true, endReached: false, stickyHeaderTopReached: true });\n  }\n};\n\nrenderFlatlistContent = (user) => (\n  <View style={styles.flatlistContainer}>\n    <FlatList\n      data={user.cards}\n      renderItem={({ item, index }) => (\n        <QuizCard data={item} num={index} key={item.question} cardsAmount={100} />\n      )}\n      onScroll={this.onScroll}\n      scrollEnabled={Platform.OS === 'android' ? true : this.shouldBeEnabled()}\n      nestedScrollEnabled\n    />\n  </View>\n);\n")))}p.isMDXComponent=!0}}]);