/**
 * @author Sukka
 * @author xmsyyxx
 * @see https://github.com/xmsyyxx/baike/blob/aa0404ebcd45833c4d1870e281d8f5f531efa8f5/components/WikiRenderer/posthtmlToReact.jsx
 */
import { type NodeTag } from 'posthtml-parser';
import React, { ComponentPropsWithoutRef, JSX } from 'react';

type Node = NodeTag & {
    content?: Node[];
};

type HtmlTagReplaceReact = {
    [TagName in keyof JSX.IntrinsicElements]?:
        | keyof JSX.IntrinsicElements
        | React.ComponentType<ComponentPropsWithoutRef<TagName>>;
};

const SINGLE_TAGS = new Set([
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
]);

let totalIndex = 0;

const isFalsyNode = (node: Node[] | Node | string): boolean => {
    if (node == null || node === '' || Number.isNaN(node)) {
        return true;
    }

    return false;
};

export const posthtmlToReact = (tree: Node[], components: HtmlTagReplaceReact = {}, level = 0): React.ReactNode[] => {
    const treeLen = tree.length;
    if (treeLen === 0) return [];

    totalIndex = totalIndex + 1;
    const result = [];

    for (let i = 0; i < treeLen; i++) {
        const node = tree[i];

        if (isFalsyNode(node)) continue;

        if (Array.isArray(node)) {
            if (node.length !== 0) {
                result.push(...posthtmlToReact(node, components, level + 1));
            }
            continue;
        }

        if (typeof node === 'number' || typeof node === 'string') {
            result.push(node);
            continue;
        }

        if (!Array.isArray(node.content)) {
            if (isFalsyNode(node.content)) {
                node.content = [];
            } else {
                node.content = [node.content];
            }
        }

        if (!node.tag) {
            result.push(...posthtmlToReact(node.content, components, level + 1));
            continue;
        }

        if (node?.attrs?.class) {
            node.attrs.className = node.attrs.class;
            delete node.attrs.class;
        }

        if (!Array.isArray(node.content)) {
            if (isFalsyNode(node.content)) {
                node.content = [];
            } else {
                node.content = [node.content];
            }
        }

        if (!node.tag) {
            result.push(...posthtmlToReact(node.content, components, level + 1));
            continue;
        }

        const tag = typeof node.tag === 'string' ? node.tag : 'div';
        const compProps = node.attrs ?? {};
        const Comp = components[tag] ? components[tag] : tag;
        const key = `${totalIndex}-${i}-${level}`;

        if (SINGLE_TAGS.has(tag)) {
            result.push(<Comp {...compProps} key={key} />);
            result.push(...posthtmlToReact(node.content, components, level + 1));
        } else {
            result.push(
                <Comp key={key} {...compProps}>
                    {posthtmlToReact(node.content, components, level + 1)}
                </Comp>
            );
        }
    }

    return result;
};
