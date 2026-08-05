## Kế hoạch redesign lại trang About

- Hiện tại tôi muốn xóa đi kiến trúc bento grid trong `components/sections/About.tsx`, cụ thể là đoạn:

```
<div className="grid grid-cols-1 md:grid-cols-4 gap-[4px] bg-nb-ink border-[4px] border-nb-ink shadow-[12px_12px_0_var(--nb-ink)] mx-auto">
 //...
</div>
```

- Giữ lại Heading và Background
- Và chuyển lại kiến trúc có 3 section chính từ trên xuống dưới: tôi sẽ gọi là section trên -> section giữa -> section dưới.

## Section trên cùng

- Vị trí sẽ là dưới heading.
- Chia ra làm 2 part: tôi sẽ gọi là left-part và right-part (tỉ lệ 50/50).
- Left-part sẽ chứa component TextNote (tham khảo trong `docs/Component tham khảo/TextNode.md`), đoạn này thì sẽ chứa nội dung tổng thể về bản thân "Hello, I am Nguyen Hung Cuong,..." (sử dụng lại nội dung cũ cho phần này).
- Right-part sẽ chứa một component Accordion (tham khảo trong `docs/Component tham khảo/Accordion.md`), 3 Accorion item sẽ là 3 nội dung "Backend & System", "Design", "Education" (sử dụng lại nội dung cũ cho phần này luôn).

## Section ở giữa

- Sẽ là một full width section
- Chỉ có một Contribution Graph (giống y như github), giúp tôi cập nhật theo contribution graph trên github luôn.
- NOTE: theo tôi tìm hiểu thì ta có thể làm như cách trong `docs/Component tham khảo/ContributionGraph.md` (nếu cách này không khả thi thì hãy giúp tôi đề xuất giải pháp khác).

## Section dưới cùng

- tương tự như section trên cùng, chia ra làm 2 part: tôi sẽ gọi là left-part và right-part (tỉ lệ 50/50).
- Left-part sẽ chứa một đoạn text trình bày về sở thích của tôi
- Right-part sẽ là minh họa các sở thích của tôi bằng hình ảnh (sử dụng lại 4 ảnh cũ trong nội dung cũ) được trình bày trên PolaroidDeck (tham khảo trong `docs/Component tham khảo/PolaroidDeck.md`).
