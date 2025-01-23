import { config } from '@/blog.config';
import Script from 'next/script';

export default function Analytics() {
    if (!config.analytics) return null;
    return (
        <>
            {<La51 />}
            {<GoogleAnalytics />}
            {<Umami />}
        </>
    );
}

// https://v6.51.la
function La51() {
    const id = config.analytics?.la51;
    if (!id) return null;

    const string = `!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"${id}",ck:"${id}",hashMode:true});`;
    return <Script id="51la" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: string }} />;
}

// https://analytics.google.com
function GoogleAnalytics() {
    const googleId = config.analytics?.google;
    if (!googleId) return null;

    const string = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleId}');`;
    return (
        <>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}></Script>
            <Script id="google-analytics" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: string }} />
        </>
    );
}

// https://umami.is
function Umami() {
    const id = config.analytics?.umami;
    if (!id) return null;

    return <Script src="https://cloud.umami.is/script.js" defer data-website-id={id} />;
}
