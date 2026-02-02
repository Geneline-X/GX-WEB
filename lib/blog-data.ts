export interface BlogEntry {
    id: string
    title: string
    summary: string
    author: string
    date: string
    tags: string[]
    externalUrl: string
    featured: boolean
}

export const blogs: BlogEntry[] = [
    {
        id: "self-reflective-learning-systems",
        title: "Self-Reflective Learning Systems: Event-Driven Continual Adaptation via Agent-Triggered Low-Rank Updates",
        summary: "This blog introduces a novel AI architecture called Self-Reflective Learning Systems, which decouples learning decisions from weight updates. Instead of continuously training models online, an autonomous agent monitors model performance and triggers targeted LoRA-based adaptations only when necessary. The approach addresses catastrophic forgetting, unbounded model growth, and non-stationary data, with a case study focused on low-resource African languages (e.g., Krio speech recognition).",
        author: "Dennis Stephens (Geneline-X / GX)",
        date: "January 2026",
        tags: ["Continual Learning", "Autonomous Agents", "Low-Rank Adaptation (LoRA)", "Speech & Language AI"],
        externalUrl: "https://medium.com/@kamaradennis36/self-reflective-learning-systems-event-driven-continual-adaptation-via-agent-triggered-low-rank-e43d180391c1", // Example URL as none was provided
        featured: true,
    },
    {
        id: "breaking-the-silence-krio-synthesis",
        title: "Breaking the Silence: High-Fidelity Krio Synthesis via Parameter-Efficient Flow Matching",
        summary: "This article presents Geneline-X’s work on high-fidelity Krio text-to-speech synthesis, demonstrating how parameter-efficient fine-tuning (LoRA) combined with Flow Matching architectures can bring state-of-the-art speech generation to low-resource languages. Instead of training massive models from scratch, the team freezes a 1.6B-parameter backbone (CSM-1B) and injects lightweight LoRA adapters—updating only 1.75% of the model’s weights. This enables high-quality Krio speech synthesis proving that African language AI can scale through architectural efficiency.",
        author: "Geneline-X",
        date: "January 2026",
        tags: ["Generative Audio", "Low-Resource NLP", "Speech Synthesis", "Efficient AI", "African Languages"],
        externalUrl: "https://medium.com/@info_33991/breaking-the-silence-high-fidelity-krio-synthesis-via-parameter-efficient-flow-matching-bd45f71b42b4", // Placeholder URL as requested
        featured: true,
    }
]
