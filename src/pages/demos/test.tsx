import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Camera, Compass, Heart, Sun, Users, Utensils } from "lucide-react";

export const Test = () =>
{
  const culinaryExperiences = [
    {
      id: 1,
      title: 'Street Food Tours',
      location: 'Bangkok, Thailand',
      image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000',
      description: 'Explore authentic flavors at bustling night markets',
      icon: Utensils,
    },
    {
      id: 2,
      title: 'Wine Tasting',
      location: 'Tuscany, Italy',
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2000',
      description: 'Sample world-class wines in historic vineyards',
      icon: Sun,
    },
    {
      id: 3,
      title: 'Cooking Classes',
      location: 'Paris, France',
      image:
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000',
      description: 'Learn to create French cuisine with local chefs',
      icon: Users,
    },
    {
      id: 4,
      title: 'Sushi Experience',
      location: 'Tokyo, Japan',
      image:
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2000',
      description: 'Master the art of sushi making in authentic settings',
      icon: Camera,
    },
    {
      id: 5,
      title: 'Tapas & Culture',
      location: 'Barcelona, Spain',
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000',
      description: 'Discover Spanish culinary traditions and culture',
      icon: Heart,
    },
    {
      id:6,
      title: 'Seafood Markets',
      location: 'Sydney, Australia',
      image:
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=2000',
      description: 'Fresh catches and harbor-side dining experiences',
      icon: Compass,
    },
  ];
  
  return (
    <div>
       <div className="max-w-md mx-auto">
         <Carousel>
           <CarouselContent>
              {culinaryExperiences.map((experiences, id) => (
                <CarouselItem key={id}>
                    <Card className="p-8 text-center ">
                         <img src={experiences.image} alt="" className="h-64 w-96" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Carousel item content</p>
                            </Card>
                 </CarouselItem>
             ))}
          </CarouselContent>
           <CarouselPrevious />
            <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
