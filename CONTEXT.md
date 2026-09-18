# AI Blog

A weekly, AI-generated and AI-maintained blog covering web, mobile, backend, and AI development topics, built as a custom-coded newspaper-style site.

## Language

**Post**:
A single article, git-tracked as a markdown/MDX file with front-matter, produced by one weekly pipeline run.
_Avoid_: Article (fine informally, but "Post" is the canonical unit with a defined schema)

**Dek**:
A short teaser summary shown on newspaper-style listing/index cards, distinct from the post body.
_Avoid_: Summary, excerpt

**Category**:
The single top-level domain a Post belongs to: Web, Mobile, Backend, or AI. Mirrors the site's newspaper-style section structure.
_Avoid_: Domain, section (domain is used loosely elsewhere in conversation; Category is the canonical field name)

**Tag**:
A cross-cutting label on a Post, orthogonal to Category, used for filtering/related-post grouping.

**Backlog**:
The in-repo running list of candidate topics not yet written up, checked before each weekly run to avoid picking a duplicate topic. Seedable and vetoable by the human maintainer.
_Avoid_: Topic queue, idea list

**Draft**:
A Post produced by the pipeline but not yet merged/published; lives on a branch as an open pull request awaiting human approval.

**Publish**:
The act of merging a Draft's pull request, making the Post live on the site.
_Avoid_: Ship, deploy (those refer to the site's own deploy mechanics, not this content-approval step)
