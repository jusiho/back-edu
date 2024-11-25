import type { Attribute, Schema } from '@strapi/strapi';

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
    description: '';
    displayName: 'Instructor';
  };
  attributes: {
    biography: Attribute.Text;
    specialization: Attribute.String;
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
