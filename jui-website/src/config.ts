import App from './pages/app';
import Docs from './pages/docs';
import Help from './pages/help';
// import Playground from './pages/playground';
import Theme from './theme';

export default {
  theme: Theme,
  styleDebug: true,
  routes: [
    { path: '/', component: App, name: 'App' },
    { path: '/docs', component: Docs, name: 'Docs' },
    { path: '/docs/:section/', component: Docs, name: 'Docs' },
    { path: '/help', component: Help, name: 'Help' }
    // { path: '/playground', component: Playground, name: 'Playground' }
  ],
  codeblocks: {
    lessCode: `const nital = ["batten", "hatton", "fatten", "platen"];

new Container().display('flex').gap(10).addChild(
  ...Array(nital.length).fill('https://picsum.photos/100')
    .map((photo, index) => {
      return new Container().display('flex')
        .flexDirection('column').alignItems('center')
        .addChild(
          new IMG().attrAlt("Photo " + (index + 1))
            .borderRadius(100).border('4px solid white')
            .attrSrc(photo + '?random=' + (index + 1)),
          new Span().text(nital[index]).fontSize(16)
            .color('#303030').backgroundColor('white')
            .borderRadius(4).padding([4, 12])
            .fontFamily('arial').marginTop(16)
        )
    })
)`
  },
  gradientSVG: `<g opacity="0.21">
    <g filter="url(#filter0_f_13446_3552)">
    <circle cx="529.5" cy="651.5" r="229.5" fill="#FF9A5F"/>
    </g>
    <g filter="url(#filter1_f_13446_3552)">
    <circle cx="712" cy="536" r="236" fill="#7240D3"/>
    </g>
    <g filter="url(#filter2_f_13446_3552)">
    <circle cx="1026" cy="678" r="214" fill="#F83072" fill-opacity="0.55"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_f_13446_3552" x="0" y="122" width="1059" height="1059" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_13446_3552"/>
    </filter>
    <filter id="filter1_f_13446_3552" x="176" y="0" width="1072" height="1072" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_13446_3552"/>
    </filter>
    <filter id="filter2_f_13446_3552" x="512" y="164" width="1028" height="1028" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_13446_3552"/>
    </filter>
    </defs>`,
  topLinks: [
    { title: "Docs", href: "/docs" },
    { title: 'Playground', href: 'https://playground.javascriptui.dev' },
    { title: "Help", href: "/help" },
    { title: "Donate", href: "https://github.com/tulburg/javascriptui" },
  ],
  socialLinks: [
    { src: require('./assets/twitter.svg'), alt: 'twitter logo', href: 'https://twitter.com/tulburg' },
    { src: require('./assets/github.svg'), alt: 'github logo', href: 'https://github.com/tulburg/javascriptui' }
  ],
  footerLinks: [
    [
      { heading: true, title: 'Channels' },
      { href: 'https://github.com/tulburg/javascriptui', title: 'Github' },
      { href: 'https://twitter.com/tulburg', title: 'Twitter' },
      { href: 'https://discord.com/tulburg', title: 'Discord' },
    ],
    [
      { heading: true, title: 'Resources' },
      { href: '/docs', title: 'Installation' },
      { href: '/docs', title: 'Documentation' },
      { href: '/docs/element-functions', title: 'API References' },
      { href: '/change-log', title: 'Change log' },
    ],
    [
      { heading: true, title: 'More info' },
      { href: '/blog', title: 'Blog' },
      { href: '/help', title: 'Help' },
      { href: '/faq', title: 'FAQs' }
    ]
  ]
}

