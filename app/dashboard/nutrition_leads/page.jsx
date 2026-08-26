import NutritionLeads from '../../../src/views/Dashboard/Pages/NutritionLeads';

export const metadata = {
  title: 'Nutrition Consultations | Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <NutritionLeads />;
}
