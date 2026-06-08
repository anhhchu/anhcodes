import { Section } from "@/components/section";
import { testimonials } from "@/data/site";
import { Carousel, TestimonialCard } from "@/components/ui/retro-testimonial";

export function Testimonials() {
  const cards = testimonials.map((t, index) => (
    <TestimonialCard
      key={t.name}
      index={index}
      testimonial={{
        name: t.name,
        designation: t.role,
        description: t.comment,
      }}
    />
  ));

  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title="What people say."
      className="border-t border-line"
    >
      <Carousel items={cards} />
    </Section>
  );
}
