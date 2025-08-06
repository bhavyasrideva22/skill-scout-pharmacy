import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, Users, Clock, Award, ArrowRight } from 'lucide-react';

interface WelcomeSectionProps {
  onStart: () => void;
}

export function WelcomeSection({ onStart }: WelcomeSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center text-white space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Pill className="h-12 w-12" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Is Pharmacy Technician Right for You?
            </h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            A comprehensive career and learning readiness assessment to determine your fit for pharmacy technician work
          </p>
        </div>
        
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">
              Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Pill className="h-5 w-5 text-medical-blue" />
                  What Does a Pharmacy Technician Do?
                </h3>
                <p className="text-muted-foreground">
                  Pharmacy Technicians assist pharmacists in dispensing medications, managing inventory, 
                  communicating with healthcare providers, and ensuring regulatory compliance.
                </p>
                
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-medical-green" />
                  Typical Career Paths
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Certified Pharmacy Technician (CPhT)</Badge>
                  <Badge variant="secondary">Hospital Pharmacy Assistant</Badge>
                  <Badge variant="secondary">Retail Pharmacy Assistant</Badge>
                  <Badge variant="secondary">Compounding Technician</Badge>
                  <Badge variant="secondary">Inventory Specialist</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Award className="h-5 w-5 text-medical-teal" />
                  Key Skills for Success
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Attention to detail and accuracy</li>
                  <li>• Strong communication skills</li>
                  <li>• Organization and time management</li>
                  <li>• Ethical responsibility</li>
                  <li>• Customer service orientation</li>
                  <li>• Ability to work in structured environments</li>
                </ul>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Assessment Time: 20-30 minutes</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">What You'll Discover:</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-gradient-primary text-white">
                  <h4 className="font-semibold">Psychological Fit</h4>
                  <p className="text-sm opacity-90">Personality alignment with pharmacy work</p>
                </Card>
                <Card className="p-4 bg-gradient-success text-white">
                  <h4 className="font-semibold">Technical Readiness</h4>
                  <p className="text-sm opacity-90">Math, science, and pharmacy knowledge</p>
                </Card>
                <Card className="p-4 bg-medical-teal text-white">
                  <h4 className="font-semibold">WISCAR Analysis</h4>
                  <p className="text-sm opacity-90">Multi-dimensional readiness evaluation</p>
                </Card>
                <Card className="p-4 bg-pharmacy-orange text-white">
                  <h4 className="font-semibold">Career Guidance</h4>
                  <p className="text-sm opacity-90">Personalized next steps and alternatives</p>
                </Card>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={onStart}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}