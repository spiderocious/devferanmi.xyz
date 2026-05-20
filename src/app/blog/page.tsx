import { redirect } from "next/navigation";
import { blogUrl } from "../shared/seo/config";

export const dynamic = "force-static";

export default function BlogPage() {
  redirect(blogUrl());
}
