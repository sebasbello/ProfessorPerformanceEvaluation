﻿using ProfessorPerformanceEvaluation.Model;
using ProfessorPerformanceEvaluation.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ProfessorPerformanceEvaluation.Views
{
    /// <summary>
    /// Lógica de interacción para RegisterFaculty.xaml
    /// </summary>
    public partial class RegisterFaculty : Window
    {
        public RegisterFaculty()
        {
            InitializeComponent();
        }

        private void RegisterButtonClick(object sender, RoutedEventArgs e)
        {
            if (EmptyFields())
            {
                var faculty = new Faculty()
                {
                    Name = this.FacultyNameTextBox.Text
                };
                LogFacultyName(faculty);
            }
            else
            {
                MessageBox.Show(Properties.Resources.CHECK_ENTERED_INFORMATION_LABEL,
                   Properties.Resources.EMPTY_FIELDS_LABEL);
            }
        }

        private Boolean EmptyFields()
        {
            Boolean result = false;
            if (!string.IsNullOrEmpty(this.FacultyNameTextBox.Text))
            {
                result = true;
            }
            return result;
        }

        private async void LogFacultyName(Faculty faculty)
        {
            Response response = await FacultyService.Post(faculty);
            if (response.Code == (int)HttpStatusCode.OK)
            {
                MessageBox.Show(Properties.Resources.REGISTERED_INFORMATION_LABEL);
                this.Close();
            }
            else if (response.Code == (int)HttpStatusCode.Forbidden)
            {
                MessageBox.Show(Properties.Resources.TRY_AGAIN_LATER_LABEL,
                    Properties.Resources.EXPIRED_SESSION_LABEL);
                this.Close();
            }
            else
            {
                MessageBox.Show(Properties.Resources.TRY_AGAIN_LATER_LABEL,
                    Properties.Resources.SERVICE_NOT_AVAILABLE_LABEL);
                this.Close();
            }
        }


        private void BackButtonClick(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
