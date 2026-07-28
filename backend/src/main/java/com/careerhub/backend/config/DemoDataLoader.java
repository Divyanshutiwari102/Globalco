package com.careerhub.backend.config;

import com.careerhub.backend.entity.Job;
import com.careerhub.backend.repository.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
public class DemoDataLoader {

    @Bean
    CommandLineRunner initDatabase(JobRepository jobRepository) {
        return args -> {
            if (jobRepository.count() == 0) {
                Job job1 = new Job();
                job1.setTitle("Senior Software Engineer");
                job1.setCompany("Google");
                job1.setLocation("Mountain View, CA");
                job1.setSalary("$180,000 - $220,000");
                job1.setDescription("Join Google's Search team to build the next generation of search experiences that impact billions of users worldwide. You'll work on large-scale distributed systems, machine learning algorithms, and user-facing products.");
                        job1.setExperience("5+ years");
                job1.setEmploymentType("Full-time");
                job1.setSkills("Java, Python, C++, Distributed Systems, Machine Learning");
                jobRepository.save(job1);

                Job job2 = new Job();
                job2.setTitle("Software Engineer II");
                job2.setCompany("Microsoft");
                job2.setLocation("Redmond, WA");
                job2.setSalary("$130,000 - $160,000");
                job2.setDescription("Join the Azure Cloud team to develop scalable cloud services and infrastructure. Work with cutting-edge technologies to help organizations of all sizes achieve more with the cloud.");
                        job2.setExperience("3-5 years");
                job2.setEmploymentType("Full-time");
                job2.setSkills("C#, .NET, Azure, Cloud Computing, SQL");
                jobRepository.save(job2);

                Job job3 = new Job();
                job3.setTitle("Senior Product Manager");
                job3.setCompany("Amazon");
                job3.setLocation("Seattle, WA");
                job3.setSalary("$160,000 - $200,000");
                job3.setDescription("Lead the development of innovative e-commerce features for Amazon's marketplace. Collaborate with engineering, design, and business teams to define product vision and execute roadmap.");
                        job3.setExperience("5+ years");
                job3.setEmploymentType("Full-time");
                job3.setSkills("Product Management, Agile, E-commerce, Data Analysis, Leadership");
                jobRepository.save(job3);

                Job job4 = new Job();
                job4.setTitle("Frontend Engineer");
                job4.setCompany("Adobe");
                job4.setLocation("San Jose, CA");
                job4.setSalary("$120,000 - $150,000");
                job4.setDescription("Create beautiful and intuitive user experiences for Adobe Creative Cloud applications. Work with modern web technologies to empower creatives worldwide.");
                        job4.setExperience("3-5 years");
                job4.setEmploymentType("Full-time");
                job4.setSkills("JavaScript, TypeScript, React, CSS, UI/UX Design");
                jobRepository.save(job4);

                Job job5 = new Job();
                job5.setTitle("Database Administrator");
                job5.setCompany("Oracle");
                job5.setLocation("Austin, TX");
                job5.setSalary("$100,000 - $130,000");
                job5.setDescription("Manage and optimize Oracle database systems for enterprise clients. Ensure high availability, performance, and security of critical business data.");
                        job5.setExperience("3-5 years");
                job5.setEmploymentType("Full-time");
                job5.setSkills("Oracle SQL, PL/SQL, Database Tuning, Backup & Recovery, Linux");
                jobRepository.save(job5);

                Job job6 = new Job();
                job6.setTitle("DevOps Engineer");
                job6.setCompany("Atlassian");
                job6.setLocation("Sydney, Australia");
                job6.setSalary("$110,000 - $140,000");
                job6.setDescription("Build and maintain CI/CD pipelines for Atlassian's suite of productivity tools. Implement infrastructure as code and monitoring solutions to ensure reliable service delivery.");
                        job6.setExperience("3-5 years");
                job6.setEmploymentType("Full-time");
                job6.setSkills("Docker, Kubernetes, AWS, Jenkins, Terraform, Linux");
                jobRepository.save(job6);

                Job job7 = new Job();
                job7.setTitle("Senior Sales Engineer");
                job7.setCompany("Salesforce");
                job7.setLocation("San Francisco, CA");
                job7.setSalary("$140,000 - $180,000 + Commission");
                job7.setDescription("Technical advisor for Salesforce's enterprise customers. Demonstrate solution value, architecture, and implementation strategies to drive complex sales cycles.");
                        job7.setExperience("5+ years");
                job7.setEmploymentType("Full-time");
                job7.setSkills("Salesforce CRM, SaaS, Technical Sales, Solution Architecture, Presentation Skills");
                jobRepository.save(job7);

                Job job8 = new Job();
                job8.setTitle("Mobile Engineer (iOS)");
                job8.setCompany("Uber");
                job8.setLocation("San Francisco, CA");
                job8.setSalary("$130,000 - $160,000");
                job8.setDescription("Develop features for Uber's rider and driver applications used by millions daily. Focus on performance, reliability, and innovative mobile experiences.");
                        job8.setExperience("3-5 years");
                job8.setEmploymentType("Full-time");
                job8.setSkills("Swift, Objective-C, iOS, REST APIs, Mobile UI/UX");
                jobRepository.save(job8);

                Job job9 = new Job();
                job9.setTitle("Content Data Analyst");
                job9.setCompany("Netflix");
                job9.setLocation("Los Gatos, CA");
                job9.setSalary("$120,000 - $150,000");
                job9.setDescription("Analyze viewing patterns and user engagement to inform content acquisition and production decisions. Partner with creative teams to shape Netflix's global content strategy.");
                job9.setExperience("3-5 years");
                job9.setEmploymentType("Full-time");
                job9.setSkills("SQL, Python, Data Visualization, Statistics, Media & Entertainment");
                jobRepository.save(job9);

                Job job10 = new Job();
                job10.setTitle("Restaurant Operations Manager");
                job10.setCompany("Swiggy");
                job10.setLocation("Bangalore, India");
                job10.setSalary("₹1,200,000 - ₹1,800,000");
                job10.setDescription("Oversee restaurant partner relationships and delivery operations for Swiggy's food delivery platform. Drive growth and efficiency in key metropolitan markets.");
                        job10.setExperience("3-5 years");
                job10.setEmploymentType("Full-time");
                job10.setSkills("Restaurant Management, Logistics, Stakeholder Management, Data-Driven Decision Making");
                jobRepository.save(job10);

                Job job11 = new Job();
                job11.setTitle("Senior Food Scientist");
                job11.setCompany("Zomato");
                job11.setLocation("Gurgaon, India");
                job11.setSalary("₹1,000,000 - ₹1,500,000");
                job11.setDescription("Lead research and development of new food products and technologies for Zomato's hyperpure and dining initiatives. Ensure quality, safety, and innovation in food offerings.");
                        job11.setExperience("5+ years");
                job11.setEmploymentType("Full-time");
                job11.setSkills("Food Science, R&D, Quality Control, Product Development, Regulatory Compliance");
                jobRepository.save(job11);

                Job job12 = new Job();
                job12.setTitle("Product Manager - Payments");
                job12.setCompany("PhonePe");
                job12.setLocation("Bangalore, India");
                job12.setSalary("₹1,500,000 - ₹2,200,000");
                job12.setDescription("Drive the strategy and execution of PhonePe's payment products, including UPI, wallet, and merchant solutions. Collaborate with engineering, design, and regulatory teams.");
                        job12.setExperience("4-6 years");
                job12.setEmploymentType("Full-time");
                job12.setSkills("Product Management, FinTech, UPI, Payment Systems, Stakeholder Management");
                jobRepository.save(job12);

                Job job13 = new Job();
                job13.setTitle("Senior Software Engineer - Core Platform");
                job13.setCompany("Razorpay");
                job13.setLocation("Bangalore, India");
                job13.setSalary("₹1,800,000 - ₹2,500,000");
                job13.setDescription("Build and maintain Razorpay's core payment processing platform handling thousands of transactions per second. Focus on scalability, reliability, and security.");
                        job13.setExperience("5+ years");
                job13.setEmploymentType("Full-time");
                job13.setSkills("Java, Microservices, Distributed Systems, Payments, High Availability");
                jobRepository.save(job13);

                Job job14 = new Job();
                job14.setTitle("Senior Fashion Category Manager");
                job14.setCompany("Flipkart");
                job14.setLocation("Bangalore, India");
                job14.setSalary("₹1,600,000 - ₹2,200,000");
                job14.setDescription("Own the fashion category strategy and P&L for Flipkart's marketplace. Work with brands, designers, and suppliers to curate exciting fashion collections for customers.");
                job14.setExperience("5+ years");
                job14.setEmploymentType("Full-time");
                job14.setSkills("Fashion Retail, Category Management, Vendor Management, Merchandising, E-commerce");
                jobRepository.save(job14);

                Job job15 = new Job();
                job15.setTitle("Social Media Marketing Associate");
                job15.setCompany("Meesho");
                job15.setLocation("Bangalore, India");
                job15.setSalary("₹400,000 - ₹600,000");
                job15.setDescription("Create and execute social media campaigns across Facebook, Instagram, and WhatsApp to drive seller acquisition and engagement for Meesho's reseller platform.");
                job15.setExperience("1-2 years");
                job15.setEmploymentType("Full-time");
                job15.setSkills("Social Media Marketing, Content Creation, Campaign Management, Analytics, Communication");
                jobRepository.save(job15);

                System.out.println("Loaded 15 demo jobs into the database");
            } else {
                System.out.println("Database already contains jobs. Skipping demo data load.");
            }
        };
    }
}
