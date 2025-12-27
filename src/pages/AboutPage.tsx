import React from "react";
import { Heart } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto py-12">
        
        {/* Main Title */}
        <h1 className="text-5xl font-extrabold mb-6 text-brand-primary">
          About StackBuzz
        </h1>
        
        {/* Mission Statement */}
        <p className="text-xl text-gray-300 mb-12">
          StackBuzz helps creators see what’s buzzing on Substack — instantly.
        </p>
        <p className="text-lg text-gray-400 mb-12">
          No more scrolling for hours, no more guessing what your audience cares about, and no more feeling late to every trend. StackBuzz turns the chaos of comment sections, posts, and conversations into a clear radar you can act on in seconds.
        </p>

        {/* Founder's Note */}
        <div className="p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Heart className="h-6 w-6 mr-3 text-red-400 fill-red-400" />
            Founder’s Note: Why I Built StackBuzz
          </h2>
          
          <div className="text-lg text-gray-300 space-y-6">
            <p>I built StackBuzz because I know what it feels like to create in the dark.</p>
            <p>You sit there staring at a blank page, wondering what your audience actually cares about, scrolling through Substack threads trying to spot a spark — and by the time you find it, someone else has already published the piece you could have written.</p>
            <p>I hated that feeling.</p>
            <p className="font-bold text-brand-primary">Not the work — the guessing.</p>
            <p>So I built StackBuzz as a way out of that fog.</p>
            <p>A tool that shows you, instantly, what’s buzzing in your niche, what conversations are heating up, and which creators are driving the momentum. No more detective work. No more hoping you’re early. No more writing blind.</p>
            <p className="font-bold text-white">This isn’t analytics.</p>
            <p>It’s a radar for creators who want to move with intention.</p>
            <p>If you’ve ever felt behind, overwhelmed, or unsure what to write next, I built this for you — because I’ve been there too.</p>
          </div>
          
          <p className="text-xl font-semibold text-brand-primary pt-4">— Alex</p>
        </div>
        
        {/* Future Vision */}
        <div className="mt-12 space-y-4">
            <h2 className="text-3xl font-bold text-white">Where StackBuzz Is Going</h2>
            <p className="text-lg text-gray-400">
                The goal is simple: help creators move faster with more clarity and less guesswork.
            </p>
            <p className="text-lg text-gray-400">
                As you save keywords and track conversations, your radar gets sharper — giving you an edge that compounds over time.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;