import { revalidateTag } from 'next/cache';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    revalidateTag(params.id);
    return Response.json({ revalidated: true, now: Date.now() });
}
