import React, { useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Moon, Sun, Image as ImageIcon, Download } from 'lucide-react';

export default function ShayariWebsiteApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [shayari, setShayari] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sad');
  const previewRef = useRef(null);

  const categories = ['Sad', 'Love', 'Krishna', 'Motivational', 'Rap'];

  const templates = useMemo(
    () => [
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-emerald-500 to-teal-500'
    ],
    []
  );

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const handleDownload = () => {
    alert('Download feature will be connected to image export in the next version.');
  };

  const handleSocialPost = (platform) => {
    const text = encodeURIComponent(`${title}\n\n${shayari}`);

    const urls = {
      instagram: 'https://www.instagram.com/',
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${text}`
    };

    window.open(urls[platform], '_blank');
  };

  return (
    <div
      className={`${
        darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'
      } min-h-screen transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold">Shayari Creator Website</h1>
            <p className="text-sm opacity-70 mt-1">
              Create beautiful Shayari posts for Instagram & Facebook
            </p>
          </div>

          <Button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-2xl w-fit"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="rounded-[2rem] shadow-xl border-0">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Write Shayari</h2>

              <Input
                placeholder="Shayari Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4 rounded-2xl"
              />

              <select
                className="w-full p-3 rounded-2xl border mb-4 bg-transparent"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <Textarea
                placeholder="अपनी शायरी यहाँ लिखें..."
                rows={8}
                value={shayari}
                onChange={(e) => setShayari(e.target.value)}
                className="rounded-2xl mb-4 text-lg"
              />

              <h3 className="font-semibold mb-3">Choose Background Template</h3>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {templates.map((temp, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedTemplate(temp)}
                    className={`${temp} h-20 rounded-2xl border-4 transition-all ${
                      selectedTemplate === temp
                        ? 'border-white scale-95 shadow-lg'
                        : 'border-transparent'
                    }`}
                    aria-label={`Template ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="rounded-2xl flex-1">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Auto Generate Image
                </Button>

                <Button
                  variant="outline"
                  className="rounded-2xl flex-1"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Post
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] shadow-xl border-0">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Instagram Post Preview (1080×1080)
              </h2>

              <div
                ref={previewRef}
                className={`aspect-square rounded-[2rem] p-8 flex flex-col justify-center items-center text-center ${selectedTemplate}`}
              >
                <h3 className="text-3xl font-bold text-white mb-4 break-words">
                  {title || 'Shayari Title'}
                </h3>

                <p className="text-white text-xl md:text-2xl whitespace-pre-line leading-relaxed font-serif max-w-full break-words">
                  {shayari || 'आपकी शायरी यहाँ दिखाई देगी'}
                </p>

                <span className="mt-6 text-white text-sm bg-white/20 px-4 py-2 rounded-full">
                  {category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  className="rounded-2xl"
                  onClick={() => handleSocialPost('instagram')}
                >
                  📸 Post to Instagram
                </Button>

                <Button
                  className="rounded-2xl"
                  onClick={() => handleSocialPost('facebook')}
                >
                  👍 Post to Facebook
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
