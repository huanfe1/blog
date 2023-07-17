import { Post } from '@/.contentlayer/generated';
import { Node } from 'posthtml-parser';

export type TocProps = {
    content: string;
    tree: { id: string; text: string; level: number }[];
};

export type PostProps = {
    toc: TocProps;
    content: Node[];
    wordcount: string;
} & Omit<Post, 'wordcount'>;
