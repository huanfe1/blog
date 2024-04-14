import { revalidateTag } from 'next/cache';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    setTimeout(() => revalidateTag(params.id), 30000);
    return Response.json({ revalidated: true, now: Date.now() });
}
