import type { Schema, Attribute } from '@strapi/strapi';

export interface InstructorAnother extends Schema.Component {
  collectionName: 'components_instructor_anothers';
  info: {
    displayName: 'another';
  };
  attributes: {};
}

export interface InstructorInstructor extends Schema.Component {
  collectionName: 'components_instructor_instructors';
  info: {
    displayName: 'Instructor';
    description: '';
  };
  attributes: {
    specialization: Attribute.String;
    biography: Attribute.Text;
  };
}

export interface StudentStudent extends Schema.Component {
  collectionName: 'components_student_students';
  info: {
    displayName: 'Student';
  };
  attributes: {
    about_me: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'instructor.another': InstructorAnother;
      'instructor.instructor': InstructorInstructor;
      'student.student': StudentStudent;
    }
  }
}
