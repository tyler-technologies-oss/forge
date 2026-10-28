# Paginator

The paginator divides a logically sorted collection into pages, so users can navigate and mentally orient within the set.

## Overview

The paginator component enables navigation through large collections of items by breaking content into manageable pages. It is typically used with tables, lists, and card collections to help users navigate datasets while maintaining their orientation within the results, but can be used in any context where pagination of content is desired.

Pagination works best when records are sorted in a logical way, allowing users to mentally bookmark their location in an ordered result set.

## Usage

`forge-paginator` navigates a `total`-item collection through `pageIndex`, `pageSize`, `pageSizeOptions`, and `firstLast`/`first` jump buttons, plus an `alternative` compact layout. Pair it with a [table](./table.md) or [list](./list.md) whose data is sorted in a logical order, so a user can jump to a page or mentally orient within the set. For casual browsing or discovery, infinite scroll fits better than pagination.

## Rules

**Do**

- Let users choose how many records to show per page via pageSizeOptions.
- Default to fewer records per page for a large data set if load time is a concern.
- Return a user to their previous page position when they navigate back from a detail view.
- Display the paginator below the content it paginates, never fixed in place or covering content.

**Don't**

- Don't use pagination for casual browsing or discovery — infinite scroll fits that better.
- Don't fix the paginator's position so it overlaps the content above it.
- Don't omit page-size control on a data set large enough that users would want to adjust it.
- Don't use pagination when datasets are small and don't require breaking into pages.
- Don't use when there is real-time content where new items are frequently added at the top.

## Basic usage

Set `total` to the full item count; the paginator computes page count from `pageSize`.

Example (A paginator for a 100-item collection.): `get_forge_blocks(blockId: "components/paginator/demo/demo")`

## Alternative layout

Set `alternative` for a more compact layout that swaps the page-size select and range label for a simpler page-count label — useful in tight spaces.

Example (The compact alternative layout, better suited to tight spaces.): `get_forge_blocks(blockId: "components/paginator/alternative/alternative")`
