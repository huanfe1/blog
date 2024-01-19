import React from 'react';

import Code from './post/code';
import Img from './post/img';
import Link from './post/link';

export default function NotionPage({ content }) {
    const result: React.JSX.Element[] = [];
    const list = [];
    for (const [index, item] of content.entries()) {
        if (list['numbered_list'] && item.type !== 'numbered_list') {
            result.push(<ol key={item.type + index}>{list['numbered_list']}</ol>);
            list['numbered_list'] = null;
        }
        if (list['bulleted_list'] && item.type !== 'bulleted_list') {
            result.push(<ul key={item.type + index}>{list['bulleted_list']}</ul>);
            list['bulleted_list'] = null;
        }
        switch (item.type) {
            case 'text': {
                if (!item.value) continue;
                result.push(<Text key={item.type + index} value={item.value.title} />);
                break;
            }
            case 'numbered_list':
            case 'bulleted_list': {
                if (!item.value) continue;
                if (!list[item.type]) list[item.type] = [];
                list[item.type].push(
                    <li key={item.type + index + list[item.type].length}>
                        <Text key={item.type + index} value={item.value.title} />
                    </li>,
                );
                break;
            }
            case 'sub_header': {
                const content = item.value.title[0][0];
                result.push(
                    <h2 key={item.type + index} id={content}>
                        {content}
                    </h2>,
                );
                break;
            }
            case 'sub_sub_header': {
                const content = item.value.title[0][0];
                result.push(
                    <h3 key={item.type + index} id={content}>
                        {content}
                    </h3>,
                );
                break;
            }
            case 'image': {
                result.push(
                    <Img
                        key={item.type + index}
                        src={item.value.url}
                        width={item.value.width}
                        height={item.value.height}
                    />,
                );
                break;
            }
            case 'divider': {
                result.push(<hr key={item.type + index} />);
                break;
            }
            case 'quote': {
                result.push(<blockquote key={item.type + index}>{item.value.title[0][0]}</blockquote>);
                break;
            }
            case 'code': {
                result.push(
                    <Code
                        content={item.value.title[0][0]}
                        language={item.value.language[0][0]}
                        key={item.type + index}
                    ></Code>,
                );
                break;
            }
            default: {
                throw new Error('unknown type: ' + item.type);
            }
        }
    }
    return result;
}

function Text({ value }) {
    const result: React.JSX.Element[] = [];
    for (const [index, item] of value.entries()) {
        if (item.length === 1) {
            result.push(item[0]);
            continue;
        }
        let tagName = 'span';
        const props: any = { key: index };
        const content = item[0];
        const tags = item[1];
        for (const tag of tags) {
            switch (tag[0]) {
                case 'a': {
                    tagName = 'a';
                    props.href = tag[1];
                    break;
                }
                case 'c': {
                    tagName = 'code';
                    break;
                }
                case 'i': {
                    props.style = { fontStyle: 'italic' };
                    break;
                }
                case 'b': {
                    props.style = { fontWeight: 'bold' };
                    break;
                }
                case '_': {
                    props.style = { textDecoration: 'underline' };
                    break;
                }
                case 'h': {
                    props.style = { color: tag[1] };
                    break;
                }
                case 's': {
                    props.style = { textDecoration: 'line-through' };
                    break;
                }
                default:
                    break;
            }
        }
        if (tagName === 'a') {
            result.push(<Link {...props}>{content}</Link>);
            continue;
        }
        result.push(React.createElement(tagName, props, content));
    }
    return <p>{result}</p>;
}
