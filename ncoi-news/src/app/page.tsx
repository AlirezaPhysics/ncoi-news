import { redirect } from 'next/navigation';

export default function RootPage() {
  // Anyone who goes to ncoinews.com will instantly be pushed to ncoinews.com/fa
  redirect('/fa');
}