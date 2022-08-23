"use strict";(self.webpackChunkreact_native_sticky_parallax_header_docs=self.webpackChunkreact_native_sticky_parallax_header_docs||[]).push([[3279],{3905:function(e,n,r){r.d(n,{Zo:function(){return d},kt:function(){return m}});var t=r(7294);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function i(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=t.createContext({}),s=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):l(l({},n),e)),r},d=function(e){var n=s(e.components);return t.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},p=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=s(r),m=a,y=p["".concat(c,".").concat(m)]||p[m]||u[m]||o;return r?t.createElement(y,l(l({ref:n},d),{},{components:r})):t.createElement(y,l({ref:n},d))}));function m(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=p;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=r[s];return t.createElement.apply(null,l)}return t.createElement.apply(null,r)}p.displayName="MDXCreateElement"},9633:function(e,n,r){r.r(n),r.d(n,{assets:function(){return d},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return i},metadata:function(){return s},toc:function(){return u}});var t=r(3117),a=r(102),o=(r(7294),r(3905)),l=["components"],i={sidebar_position:6},c="Animated color props",s={unversionedId:"guides/animated-color-props",id:"guides/animated-color-props",title:"Animated color props",description:"To make animated color props use Reanimated hooks to produce shared values that will be applied as a color/background color.",source:"@site/docs/guides/animated-color-props.md",sourceDirName:"guides",slug:"/guides/animated-color-props",permalink:"/sticky-parallax-header/docs/next/guides/animated-color-props",draft:!1,editUrl:"https://github.com/netguru/sticky-parallax-header/tree/master/docs/docs/guides/animated-color-props.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"React Navigation header and sticky header layout",permalink:"/sticky-parallax-header/docs/next/guides/react-navigation-header"}},d={},u=[],p={toc:u};function m(e){var n=e.components,r=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,t.Z)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"animated-color-props"},"Animated color props"),(0,o.kt)("p",null,"To make animated color props use Reanimated hooks to produce shared values that will be applied as a color/background color."),(0,o.kt)("p",null,"Full example code can be found in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/TabbedHeaderWithAnimatedColors.tsx"},"example repo")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const TabbedHeaderWithAnimatedColorsExample: React.FC = () => {\n  const isDarkTheme = useColorScheme() === 'dark';\n\n  // Keep track of vertical and horizontal scroll values\n  const horizontalScrollValue = useSharedValue(0);\n  const scrollValue = useSharedValue(0);\n  const onHorizontalScroll = useWorkletCallback((e: NativeScrollEvent) => {\n    horizontalScrollValue.value = e.contentOffset.x;\n  });\n  const onScroll = useWorkletCallback((e: NativeScrollEvent) => {\n    scrollValue.value = e.contentOffset.y;\n  });\n\n  // Create interpolation configs\n  const tabUnderlineColorInterpolateConfig = useInterpolateConfig(\n    [0, 1242, 2484],\n    [colors.activeOrange, colors.coralPink, colors.detailsBlue],\n    ColorSpace.RGB\n  );\n  const tabsContainerBackgroundColorInterpolateConfig = useInterpolateConfig(\n    [0, 800, 1600],\n    [colors.primaryGreen, colors.activeOrange, colors.coralPink],\n    ColorSpace.RGB\n  );\n\n  // Create shared value with color prop based on scroll values\n  const tabUnderlineColor = useDerivedValue(() =>\n    interpolateSharableColor(horizontalScrollValue.value, tabUnderlineColorInterpolateConfig)\n  );\n  const tabsContainerBackgroundColor = useDerivedValue(() =>\n    interpolateSharableColor(scrollValue.value, tabsContainerBackgroundColorInterpolateConfig)\n  );\n\n  return (\n    <>\n      <TabbedHeaderPager\n        contentContainerStyle={[\n          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,\n        ]}\n        pagerProps={{ onScroll: onHorizontalScroll }} // Keep track of pager's horizontal scroll value\n        onScroll={onScroll} // Keep track of vertical scroll value\n        tabsContainerBackgroundColor={tabsContainerBackgroundColor} // Apply color prop\n        tabUnderlineColor={tabUnderlineColor} // Apply color prop\n        containerStyle={screenStyles.stretchContainer}\n        backgroundColor={colors.primaryGreen}\n        foregroundImage={photosPortraitMe}\n        rememberTabScrollPosition\n        logo={logo}\n        title={\"Mornin' Mark! \\nReady for a quiz?\"}\n        titleStyle={screenStyles.text}\n        titleTestID={tabbedHeaderTestIDs.title}\n        tabs={TABBED_SECTIONS.map((section) => ({\n          title: section.title,\n          testID: section.tabTestID,\n        }))}\n        tabTextStyle={screenStyles.text}\n        showsVerticalScrollIndicator={false}>\n        <View style={styles.content}>\n          {Brandon.cards.map((data, i, arr) => (\n            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />\n          ))}\n        </View>\n        <View style={styles.content}>\n          {Ewa.cards.map((data, i, arr) => (\n            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />\n          ))}\n        </View>\n        <View style={styles.content}>\n          {Jennifer.cards.map((data, i, arr) => (\n            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />\n          ))}\n        </View>\n        <View style={styles.content}>\n          {Brandon.cards.map((data, i, arr) => (\n            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />\n          ))}\n        </View>\n        <View style={styles.content}>\n          {Ewa.cards.map((data, i, arr) => (\n            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />\n          ))}\n        </View>\n        <View style={styles.content}>\n          {Jennifer.cards.map((data, i, arr) => (\n            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />\n          ))}\n        </View>\n      </TabbedHeaderPager>\n      <StatusBar barStyle=\"light-content\" backgroundColor={colors.primaryGreen} translucent />\n    </>\n  );\n}\n")))}m.isMDXComponent=!0}}]);