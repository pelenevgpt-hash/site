'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, Clock, Users, Star, Phone, Mail, Instagram, 
  Menu, X, ChevronRight, Mountain, Building2, 
  Camera, Heart, Award, Compass, Send, Crown,
  Church, BookOpen, Wine, Landmark, Palette, ArrowLeft
} from 'lucide-react'

// English Tours Data - Unique tours for international visitors
const englishTours = [
  {
    id: 1,
    title: 'Soviet Heritage Tour',
    shortDescription: 'Discover the fascinating legacy of the Soviet era through architecture, monuments, and untold stories.',
    fullDescription: 'Journey through time as we explore the remarkable Soviet heritage of our city. From imposing constructivist buildings to hidden bunkers, from monumental statues to everyday Soviet life stories. This tour offers a unique perspective on a period that shaped modern Russia. You will visit former government buildings, see Soviet-era housing blocks, learn about space program achievements, and hear personal stories from locals who lived through this era.',
    duration: '4 hours',
    price: '€45',
    groupSize: '1-6 people',
    difficulty: 'Easy',
    highlights: ['Constructivist architecture masterpieces', 'Former KGB headquarters', 'Soviet-era metro stations', 'Space exploration museum', 'Authentic Soviet cafeteria lunch'],
    image: '/tours/soviet.jpg',
    icon: Landmark,
    color: 'from-red-700 to-red-900'
  },
  {
    id: 2,
    title: 'Russian Empire & Tsars',
    shortDescription: 'Step into the opulent world of Russian tsars, palaces, and imperial grandeur.',
    fullDescription: 'Experience the magnificence of the Russian Empire on this immersive tour through imperial history. Visit stunning palaces, learn about the Romanov dynasty, and discover the intriguing stories of tsars and tsarinas. From Peter the Great to Nicholas II, we will explore the lives, loves, and tragedies of Russia rulers. The tour includes visits to imperial residences, cathedrals where tsars were crowned, and hidden corners where court intrigues unfolded.',
    duration: '5 hours',
    price: '€55',
    groupSize: '1-8 people',
    difficulty: 'Easy',
    highlights: ['Imperial palace interiors', 'Romanov family history', 'Crown jewels exhibition', 'Royal gardens', 'Throne room visit'],
    image: '/tours/tsars.jpg',
    icon: Crown,
    color: 'from-amber-600 to-yellow-700'
  },
  {
    id: 3,
    title: 'Literary Russia',
    shortDescription: 'Walk in the footsteps of Tolstoy, Dostoevsky, and other literary giants.',
    fullDescription: 'For literature enthusiasts, this tour is a dream come true. Explore the places that inspired Russia greatest writers and shaped world literature. Visit the apartments where masterpieces were written, the cafes where writers gathered, and the streets described in famous novels. You will gain deep insights into Russian literary tradition and understand how history, culture, and geography influenced the works of Tolstoy, Dostoevsky, Pushkin, and Chekhov.',
    duration: '3.5 hours',
    price: '€40',
    groupSize: '1-6 people',
    difficulty: 'Easy',
    highlights: ['Dostoevsky museum and apartment', 'Literary cafes and gathering spots', 'Pushkin memorial sites', 'Bookstore with rare editions', 'Poetry reading session'],
    image: '/tours/literary.jpg',
    icon: BookOpen,
    color: 'from-emerald-700 to-teal-800'
  },
  {
    id: 4,
    title: 'Orthodox Russia',
    shortDescription: 'Experience the spiritual heritage of Russian Orthodox Christianity.',
    fullDescription: 'Discover the profound spiritual traditions of Russia through its magnificent churches, monasteries, and sacred sites. This tour takes you inside the world of Russian Orthodoxy - its art, architecture, rituals, and daily practices. You will visit ancient monasteries, learn about icon painting traditions, understand the role of the church in Russian history, and perhaps witness a beautiful Orthodox service. Perfect for those interested in religion, art history, or cultural immersion.',
    duration: '4 hours',
    price: '€35',
    groupSize: '1-10 people',
    difficulty: 'Easy',
    highlights: ['Ancient monastery visit', 'Icon museum and workshop', 'Orthodox church service', 'Bell tower climb', 'Traditional monastery lunch'],
    image: '/tours/orthodox.jpg',
    icon: Church,
    color: 'from-amber-700 to-orange-800'
  },
  {
    id: 5,
    title: 'Vodka & Caviar Experience',
    shortDescription: 'Indulge in Russian culinary traditions with premium vodka and authentic cuisine.',
    fullDescription: 'No visit to Russia is complete without experiencing its legendary culinary traditions! This gastronomic adventure will introduce you to the art of vodka tasting, the delicacy of caviar, and the warmth of Russian hospitality. Visit local markets, learn about traditional food preparation, enjoy a multi-course meal paired with premium vodkas, and understand why food and drink are central to Russian culture. An unforgettable evening of flavors, stories, and new friends.',
    duration: '4 hours',
    price: '€75',
    groupSize: '2-8 people',
    difficulty: 'Easy',
    highlights: ['Premium vodka tasting (5 varieties)', 'Caviar and blini masterclass', 'Traditional restaurant dinner', 'Local market tour', 'Recipes to take home'],
    image: '/tours/vodka.jpg',
    icon: Wine,
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 6,
    title: 'Art & Soul of Russia',
    shortDescription: 'Explore world-renowned art collections and discover the Russian creative spirit.',
    fullDescription: 'Immerse yourself in the rich artistic heritage of Russia, from religious icons to avant-garde masterpieces. This tour takes you through world-class museums, hidden galleries, and artist studios. You will see works by Repin, Kandinsky, Malevich, and many others while learning about the distinct Russian artistic tradition. The tour also includes a visit to a contemporary art space, showing how Russian art continues to evolve and inspire.',
    duration: '5 hours',
    price: '€50',
    groupSize: '1-6 people',
    difficulty: 'Easy',
    highlights: ['World-famous art museum', 'Icon painting workshop visit', 'Avant-garde gallery', 'Contemporary artist studio', 'Art souvenir shopping'],
    image: '/tours/art.jpg',
    icon: Palette,
    color: 'from-purple-700 to-violet-800'
  }
]

// Reviews from international visitors
const reviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    country: 'United Kingdom',
    rating: 5,
    tour: 'Soviet Heritage Tour',
    date: 'March 2024',
    text: 'Absolutely fascinating! Our guide brought the Soviet era to life with incredible stories and access to places I never knew existed. A must-do for history buffs.'
  },
  {
    id: 2,
    name: 'Hans Mueller',
    country: 'Germany',
    rating: 5,
    tour: 'Russian Empire & Tsars',
    date: 'February 2024',
    text: 'The tour exceeded all expectations. Learning about the Romanovs while standing in their actual palaces was an unforgettable experience.'
  },
  {
    id: 3,
    name: 'Jennifer Chen',
    country: 'United States',
    rating: 5,
    tour: 'Literary Russia',
    date: 'January 2024',
    text: 'As a literature teacher, this was a dream come true. Walking the same streets as Dostoevsky and visiting his apartment was deeply moving.'
  },
  {
    id: 4,
    name: 'Pierre Dubois',
    country: 'France',
    rating: 5,
    tour: 'Vodka & Caviar Experience',
    date: 'February 2024',
    text: 'The perfect blend of culture and cuisine! Our guide taught us so much about Russian traditions while we enjoyed incredible food and vodka.'
  }
]

export default function EnglishToursPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedTour, setSelectedTour] = useState<typeof englishTours[0] | null>(null)
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleTourSelect = (tourId: number) => {
    setSelectedTourId(tourId)
    setSelectedTour(null)
    scrollToSection('#contact')
  }

  const navItems = [
    { label: 'Tours', href: '#tours' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-foreground">English Tours</span>
                <span className="hidden sm:inline text-sm text-muted-foreground ml-2">🇬🇧</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Link 
                href="/"
                className="ml-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all font-medium flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Экскурсии на русском языке
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t animate-fade-in-up">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-3 rounded-lg text-left hover:bg-accent/50 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Link 
                href="/"
                className="px-4 py-3 rounded-lg text-left hover:bg-accent/50 transition-colors font-medium flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Русская версия
              </Link>
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Book Now
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[70vh] flex items-center pt-20 gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-accent/25 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20">
              <span className="mr-2">🇬🇧</span>
              Special tours for international visitors
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">
                Authentic Russia
              </span>{' '}
              in English
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience Russia like never before with our exclusive English-language tours. 
              From Soviet secrets to imperial grandeur, from literary legends to culinary adventures — 
              your journey awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('#tours')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all text-lg px-8"
              >
                Explore Tours
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="border-2 hover:bg-accent/50 transition-all text-lg"
              >
                Contact Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary">6+</div>
                <div className="text-sm text-muted-foreground">Unique tours</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Happy visitors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">In English</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Our Tours</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-muted-foreground text-lg">
              Each tour is designed to give you an authentic and unforgettable Russian experience
            </p>
          </div>

          {/* Tours Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishTours.map((tour, index) => {
              const IconComponent = tour.icon
              return (
                <Card 
                  key={tour.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedTour(tour)}
                >
                  {/* Image */}
                  <div className={`h-48 relative overflow-hidden ${tour.image ? '' : `bg-gradient-to-br ${tour.color}`}`}>
                    {tour.image ? (
                      <>
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IconComponent className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </>
                    )}
                    <Badge className="absolute top-4 right-4 bg-white/90 text-foreground hover:bg-white">
                      {tour.duration}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {tour.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {tour.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{tour.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {tour.price}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Authentic Experience
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Licensed Guides</h4>
                <p className="text-sm text-muted-foreground">Professional, certified English-speaking guides</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Small Groups</h4>
                <p className="text-sm text-muted-foreground">Intimate tours for a personal experience</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Unique Routes</h4>
                <p className="text-sm text-muted-foreground">Tours you won&apos;t find anywhere else</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Local Insights</h4>
                <p className="text-sm text-muted-foreground">Real stories from real locals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Reviews</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Guests Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real experiences from travelers from around the world
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, index) => (
              <Card 
                key={review.id}
                className="hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.country} • {review.tour}</p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} 
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                  </div>
                  
                  {/* Text */}
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <Badge variant="secondary" className="mb-4">Contact</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Explore Russia?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Book your tour or ask any questions. We speak fluent English and are always happy to help 
                you plan your perfect Russian adventure.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">WhatsApp / Phone</div>
                    <div className="font-semibold">+7 926 213 20 39</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-semibold">ikrasnogorskaya@yandex.ru</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Instagram</div>
                    <div className="font-semibold">@moscow_with_yvetta</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Book Your Tour</CardTitle>
                <CardDescription>
                  Fill out the form and we will get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  {/* Selected tour info */}
                  {selectedTourId && (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Selected tour:</p>
                          <p className="font-semibold text-primary">
                            {englishTours.find(t => t.id === selectedTourId)?.title}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTourId(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">WhatsApp</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">Preferred Date</label>
                      <input
                        id="date"
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tour" className="text-sm font-medium">Select Tour</label>
                    <select
                      id="tour"
                      value={selectedTourId || ''}
                      onChange={(e) => setSelectedTourId(e.target.value ? Number(e.target.value) : null)}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Choose a tour</option>
                      {englishTours.map(tour => (
                        <option key={tour.id} value={tour.id}>{tour.title} — {tour.price}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message (optional)</label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Any special requests or questions..."
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Send Booking Request
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">English Tours Russia</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Русская версия
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2024 All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Tour Detail Modal */}
      <Dialog open={!!selectedTour} onOpenChange={() => setSelectedTour(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedTour && (
            <>
              <DialogHeader>
                <div className={`h-48 -mx-6 -mt-6 bg-gradient-to-br ${selectedTour.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <selectedTour.icon className="w-20 h-20 text-white/80" />
                  </div>
                </div>
                <DialogTitle className="text-2xl mt-4">{selectedTour.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedTour.shortDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-xl bg-muted">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-semibold">{selectedTour.duration}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted">
                    <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm text-muted-foreground">Group</div>
                    <div className="font-semibold">{selectedTour.groupSize}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted">
                    <Mountain className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm text-muted-foreground">Difficulty</div>
                    <div className="font-semibold">{selectedTour.difficulty}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted">
                    <Star className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-bold text-primary">{selectedTour.price}</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">About This Tour</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedTour.fullDescription}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-semibold mb-3">What You&apos;ll Experience</h4>
                  <ul className="space-y-2">
                    {selectedTour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <ChevronRight className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleTourSelect(selectedTour.id)}
                  >
                    Book This Tour
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedTour(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
