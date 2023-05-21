import dayjs from 'dayjs';

export default function getArchives(posts) {
    const arr = [];
    posts.forEach(post => {
        const year = dayjs(post.date).format('YYYY');
        const index = arr.findIndex(item => item.year === year);
        const temp = {
            title: post.title,
            date: dayjs(post.date).format('MM-DD'),
            abbrlink: post.abbrlink,
        };
        if (index !== -1) {
            arr[index].posts.push(temp);
        } else {
            arr.push({
                year,
                posts: [temp],
            });
        }
    });
    arr.sort((a, b) => b.year - a.year);
    arr.forEach(item => {
        item.posts.sort((a, b) => b.date - a.date);
    });
    return arr;
}
