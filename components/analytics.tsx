import Script from 'next/script';

export default function Analytics() {
    const _51la: string =
        '!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"JmvyCfPiIR4wTw9W",ck:"JmvyCfPiIR4wTw9W",hashMode:true});';
    const google: string = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XFQZ8KB23B');`;
    return (
        <>
            {/* 51.la */}
            <script dangerouslySetInnerHTML={{ __html: _51la }} />
            {/* Google Analytics */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-XFQZ8KB23B"></Script>
            <script dangerouslySetInnerHTML={{ __html: google }} />
        </>
    );
}
