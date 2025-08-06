import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults } from '@/types/assessment';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users,
  Download,
  RefreshCw
} from 'lucide-react';

interface ResultsSectionProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export function ResultsSection({ results, onRestart }: ResultsSectionProps) {
  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'yes': return <CheckCircle className="h-8 w-8 text-assessment-excellent" />;
      case 'maybe': return <AlertCircle className="h-8 w-8 text-assessment-moderate" />;
      case 'no': return <XCircle className="h-8 w-8 text-assessment-needs" />;
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-assessment-excellent';
    if (score >= 60) return 'text-assessment-good';
    if (score >= 40) return 'text-assessment-moderate';
    return 'text-assessment-needs';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Needs Work';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your Assessment Results</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your pharmacy technician career readiness
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="shadow-xl border-2">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              {getRecommendationIcon(results.recommendation)}
              <CardTitle className="text-3xl">
                Overall Score: {results.overallScore}/100
              </CardTitle>
            </div>
            <div className="text-xl font-semibold">
              {results.recommendation === 'yes' && (
                <Badge className="bg-assessment-excellent text-white text-lg px-4 py-2">
                  ✅ Recommended for Pharmacy Technician Career
                </Badge>
              )}
              {results.recommendation === 'maybe' && (
                <Badge className="bg-assessment-moderate text-white text-lg px-4 py-2">
                  ⚠️ Potential with Development Needed
                </Badge>
              )}
              {results.recommendation === 'no' && (
                <Badge className="bg-assessment-needs text-white text-lg px-4 py-2">
                  ❌ Consider Alternative Career Paths
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center leading-relaxed">
              {results.recommendationText}
            </p>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Psychological Fit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(results.psychometricScore)}`}>
                  {results.psychometricScore}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getScoreLabel(results.psychometricScore)}
                </div>
              </div>
              <Progress value={results.psychometricScore} className="h-3" />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-medical-green" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(results.technicalScore)}`}>
                  {results.technicalScore}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getScoreLabel(results.technicalScore)}
                </div>
              </div>
              <Progress value={results.technicalScore} className="h-3" />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-medical-teal" />
                WISCAR Average
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const wiscarAvg = Math.round(
                  Object.values(results.wiscarScores).reduce((sum, val) => sum + val, 0) / 6
                );
                return (
                  <>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(wiscarAvg)}`}>
                        {wiscarAvg}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getScoreLabel(wiscarAvg)}
                      </div>
                    </div>
                    <Progress value={wiscarAvg} className="h-3" />
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Detailed Breakdown */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>WISCAR Framework Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(results.wiscarScores).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">
                      {key === 'realWorld' ? 'Real-World Alignment' : key}
                    </span>
                    <span className={`font-bold ${getScoreColor(value)}`}>
                      {value}
                    </span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Improvements */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-assessment-excellent">
                <CheckCircle className="h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-assessment-excellent rounded-full mt-2 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-assessment-moderate">
                <TrendingUp className="h-5 w-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-assessment-moderate rounded-full mt-2 flex-shrink-0" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Alternatives (if applicable) */}
        {results.careerAlternatives && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-medical-teal" />
                Alternative Healthcare Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.careerAlternatives.map((career, index) => (
                  <Badge key={index} variant="outline" className="p-3 text-center">
                    {career}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={onRestart} variant="outline" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake Assessment
          </Button>
          <Button size="lg" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Download Results
          </Button>
        </div>
      </div>
    </div>
  );
}