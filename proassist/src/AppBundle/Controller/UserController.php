<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends Controller
{
    /**
     * @Route("/create-user", name="create_user")
     */
    public function createUserAction(UserPasswordEncoderInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();

        $user = new User();
        $user->setUsername('daniel');
        $user->setEmail('example@example.com');

        $password = $encoder->encodePassword($user, 'password123');
        $user->setPassword($password);

        $em->persist($user);
        $em->flush();

        return new Response('Zapisano nowego użytkownika o ID: '.$user->getId());
    }
}
