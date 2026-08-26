import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import NutritionConsultation from '../../../../src/models/NutritionConsultation';

export async function PATCH(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const { status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'ID and status are required' },
        { status: 400 }
      );
    }

    const updated = await NutritionConsultation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Nutrition lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Status updated successfully', data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Nutrition Consultation PATCH error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update status' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }

    const deleted = await NutritionConsultation.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Nutrition lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Nutrition lead deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Nutrition Consultation DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
