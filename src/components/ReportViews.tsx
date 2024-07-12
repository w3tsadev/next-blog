"use client";

import { fetchUrl } from "@/lib/utils";
import { useEffect } from "react";

export default function ReportViews({
  slug,
  title,
  category,
}: {
  slug: string;
  title: string;
  category: string;
}) {
  useEffect(() => {
    const postData = async () => {
      try {
        await fetch(fetchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug, title, category }),
        });
      } catch (error) {
        console.log("Something is up...", error);
      }
    };
    postData();
  }, [category, slug, title]);
  return <></>;
}
