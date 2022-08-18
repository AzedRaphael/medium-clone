import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from "@sanity/client";

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token : process.env.API_KEY_SANITY,
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: '2021-08-31'
};
const client = sanityClient(config);

export default function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {_id, name, email, comment} = JSON.parse(req.body);

    try {
        client.create({
            _type: "comment",
            post: {
                _type: "reference",
                _ref: _id
            },
            name,
            email,
            comment
        });
    } catch (error) {
        return res.status(500).json({message: "Couldn't submit comment", error})
    }
  res.status(200).json({ message: "Comment submitted" })
}
